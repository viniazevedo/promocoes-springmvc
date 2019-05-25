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
    
    //Ação botão editar
    $("#btn-editar").on("click", function(){
    	if( isSelectedRow() ){
    		var id = getPromoId();
    		console.log("@Editar... " + id);
        	$("#modal-form").modal('show');
    	}
    });

    //Ação Botão Excluir
    $("#btn-excluir").on("click", function(){
    	if( isSelectedRow() ){
    		var id = getPromoId();
    		console.log("@Excluir... " + id);
    		$("#modal-delete").modal('show');
    		
    		
    	}
    });
    
    
    //Botão confirmar exclusão
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
	
 


 