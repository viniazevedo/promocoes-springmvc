//Submit do formulário para o Controller
$("#form-add-promo").submit(function(evt){
	//bloquear o comportamento padrão do submit(Fazer requisição e refresh da tela)
	evt.preventDefault();
	
	var promo = {};
	//A variável deve ter o mesmo nome nos atributos do objeto que será enviado ao back-end
	promo.linkPromocao = $("#linkPromocao").val();
	promo.descricao = $("#descricao").val();
	promo.preco = $("#preco").val();
	promo.titulo = $("#titulo").val();
	promo.categoria = $("#categoria").val();
	promo.linkImagem = $("#linkImagem").attr("src");
	promo.site = $("#site").text();
	
	console.log('promo: ', promo);
	
	$.ajax({
		method: "POST",
		url: "/promocao/save",
		data: promo,
		beforeSend: function(){
			$("#form-add-promo").hide();
			$("#loader-form").addClass("loader").show();
		},
		success: function(){
			$("#form-add-promo").each(function(){
				this.reset();
			});
			$("#linkImagem").attr("src","/images/promo-dark.png");
			$("#site").text("");
			$("#alert").addClass('alert alert-success').text("OK! Promoção Cadastrada com sucesso!");
		},
		error: function(xhr){
			console.log('error: ', xhr.responseText);
			$("#alert").addClass('alert alert-danger').text("Não foi possível salvar esta promoção.");
		},
		complete : function(){
			$("#loader-form").fadeOut(800, function(){
				$("#form-add-promo").fadeIn(250);
				$("#loader-form").removeClass("loader");
			});
			
		}
	});
	
});

//Função para capturar as meta tags do site
$("#linkPromocao").on('change', function(){
	var url = $(this).val();
	
	if(url.length > 7) {
		$.ajax({
			method: "POST",
			url: "/meta/info?url=" + url,
			cache: false,
			beforeSend: function() {
				$("#alert").removeClass("alert alert-danger alert-success").text("");
				$("#titulo").val('');
				$("#site").text('');
				$("#linkImagem").attr("src", '');
				$("#loader-img").addClass("loader");
			},
			success: function(data){
				console.log(data);
				$("#titulo").val(data.title);
				$("#site").text(data.site.replace("@", ""));
				$("#linkImagem").attr("src", data.image);
				
			},
			statusCode: {
				404: function(){
					$("#alert").addClass("alert alert-danger").text("Nenhuma informação pode ser recuperada dessa URL.");
					$("#linkImagem").attr("src", '/images/promo-dark.png');
				}
			},
			error: function(){
				$("#alert").addClass("alert alert-danger").text("Ops... algo deu errado. Tente novamente mais tarde.");
				$("#linkImagem").attr("src", '/images/promo-dark.png');
			},
			complete: function(){
				$("#loader-img").removeClass("loader");
			}
		});
	}
	
});