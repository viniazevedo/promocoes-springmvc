package com.loja.demo.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.loja.demo.domain.Categoria;
import com.loja.demo.domain.Promocao;
import com.loja.demo.repository.CategoriaRepository;
import com.loja.demo.repository.PromocaoRepository;

@Controller
@RequestMapping("/promocao")
public class PromocaoController {

	private static Logger log = LoggerFactory.getLogger(PromocaoController.class);
	
	@Autowired
	private CategoriaRepository categoriaRepository;
	
	@Autowired
	private PromocaoRepository promocaoRepository;
	
	@PostMapping("/save")
	public ResponseEntity<Promocao> salvarPromocao(Promocao promocao){
		log.info("Salvando a promoção...");
		log.info("Promoção:", promocao.toString());
		promocao.setDtCadastro(LocalDateTime.now());
		promocaoRepository.save(promocao);
		log.info("Promoção salva.");
		return ResponseEntity.ok().build();
	}
	
	@ModelAttribute("categorias")
	public List<Categoria> getCategorias(){
		return categoriaRepository.findAll(); 
	}
	
	@GetMapping("/add")
	public String abrirCadastro() {
		return "promo-add";
	}
	
	
}
