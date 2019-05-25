 $( document ).ready(function() {
    
	console.log("Carregando a tabela...");
    moment.locale('pt-br');
    
    var table = $("#table-server").DataTable({
		processing: true,
		serverSide: true,
		responsive: true,
		lengthMenu: [ 10, 15, 20, 25 ],
		ajax: {
			url: "/promocao/datatables/server",
			data: "data"
		},
			columns: [
				{data: 'id'},
				{data: 'titulo'},
				{data: 'site'},
				{data: 'linkPromocao'},
				{data: 'descricao'},
				{data: 'linkImagem'},
				{data: 'preco', render: $.fn.dataTable.render.number('.',',', 2,'R$')},
				{data: 'likes'},
				{data: 'dtCadastro', render: 
					function(dtCadastro){
					return moment( dtCadastro ).format('LLL');
				}
				},
				{data: 'categoria.titulo'}
				
			],
			dom: 'Bfrtip',
			buttons: [
				{
					text: 'Editar',
					attr: {
						id: 'btn-editar',
						type: 'button'
					},
					enabled: false
				},
				{
					text: 'Excluir',
					attr: {
						id: 'btn-excluir',
						type: 'button'
					},
					enabled: false
				}
			]
		});

    //Marcar/Desmarcar botões ao clicar na ordenação
    $("#table-server thead").on("click", 'tr', function(){
    	table.buttons().disable();
    });
    
    
    //Marcar/Desmarcar linhas selecionadas
    $("#table-server tbody").on("click", 'tr', function(){
    	if($(this).hasClass('selected')){
    		$(this).removeClass('selected');
    		table.buttons().disable();
    	}else{
    		$('tr.selected').removeClass('selected');
    		$(this).addClass('selected');
    		table.buttons().enable();
    	}
    });
    
    //Ação do Botão Excluir - Abrir o Modal Excluir
    $("#btn-excluir").on("click", function(){
    	if( isSelectedRow() ){
    		var id = getPromoId();
    		console.log("@Excluir... " + id);
    		$("#modal-delete").modal('show');
    		
    		
    	}
    });
    
    //Ação do botão editar - @@Abrir o Modal Editar
    $("#btn-editar").on("click", function(){
    	if( isSelectedRow() ){
    		var id = getPromoId();
    		console.log("@Editar... " + id);
    		$.ajax({
    			method: "GET",
    			url: "/promocao/edit/" + id,
    			beforeSend: function(){
    				//Remover as mensagens
        			$("span").closest('.error-span').remove();
        			//Remover as bordas vermelhas
        			$(".is-invalid").removeClass("is-invalid");
    				$("#modal-form").modal('show');
    			},
    			success: function( data ){
    				//Pré-Editar a Promoção
    				//Preencher o modal com os dados 
    				$("#edt_id").val(data.id);
    				$("#edt_site").text(data.site);
    				$("#edt_titulo").val(data.titulo);
    				$("#edt_descricao").val(data.descricao);
    				$("#edt_preco").val(data.preco.toLocaleString('pt-BR',
    						{minimumFractionDigits: 2,
    						 maximumFractionDigits: 2
    					}));
    				$("#edt_categoria").val(data.categoria.id);
    				$("#edt_linkImagem").val(data.linkImagem);
    				$("#edt_imagem").attr('src', data.linkImagem);
    			},
    			error: function(){
    				alert('Ops... Algum erro ocorreu. Tente novamente.');
    			}
    		});
    		
    	}
    });

   //Ação do Botão @@Confirmar Edição do Modal Editar
    $("#btn-edit-modal").on("click", function(){
    	var promo = {};
    	promo.descricao = $("#edt_descricao").val();
    	promo.preco = $("#edt_preco").val();
    	promo.titulo = $("#edt_titulo").val();
    	promo.categoria = $("#edt_categoria").val();
    	promo.linkImagem = $("#edt_linkImagem").val();
    	promo.id = $("#edt_id").val();
    	
    	$.ajax({
    		method: "POST",
    		url: "/promocao/edit",
    		data: promo,
    		beforeSend: function(){
    			//Remover as mensagens
    			$("span").closest('.error-span').remove();
    			//Remover as bordas vermelhas
    			$(".is-invalid").removeClass("is-invalid");
    		},
    		success: function(){
    			$("#modal-form").modal('hide');
    			table.ajax.reload();
    		 },
    		statusCode: {
    			422: function( xhr ){
    				console.log('status error: ', xhr.status);
    				var errors = $.parseJSON(xhr.responseText);
    				$.each(errors, function(key, val){
    				
    					$("#edt_" + key).addClass("is-invalid");
    					$("#error-" + key)
    					.addClass("invalid-feedback")
    					.append("<span class='error-span'>" + val + "</span>");
    				
    				});
    			}
    		}
    		 
    	});
    });
     
    //Alterar a imagem do componente de <img> do Modal Editar
    $("#edt_linkImagem").on("change", function(){
    	var link = $(this).val();
    	$("#edt_imagem").attr("src", link);
    });
    
    //Ação do Botão Confirmar Exclusão do Modal Excluir
    $("#btn-del-modal").on("click", function(){
    	var id = getPromoId();
    	$.ajax({
    		method: "GET",
    		url: "/promocao/delete/" + id,
    		success: function(){
    			$("#modal-delete").modal('hide');
    			table.ajax.reload();
    		},
    		error: function(){
    			alert('Ops... Ocorreu um erro, tente mais tarde.');
    		}
    	});
    });
    
    
    function getPromoId(){
    	return table.row(table.$('tr.selected')).data().id;
    }
    
    function isSelectedRow(){
    	var trow = table.row(table.$('tr.selected'));
    	return trow.data() !== undefined;
    }
    
     
 
 });	
	
 


 