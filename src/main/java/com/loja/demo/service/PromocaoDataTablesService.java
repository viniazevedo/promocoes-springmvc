package com.loja.demo.service;

import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

import com.loja.demo.domain.Promocao;
import com.loja.demo.repository.PromocaoRepository;

public class PromocaoDataTablesService {

	private String[] cols = {
	"id", "titulo", "site", "linkPromocao", "descricao",
	"linkImagem", "preco", "likes", "dtCadastro", "categoria"
	};

	public Map<String, Object> execute(PromocaoRepository repository, 
			HttpServletRequest request){
		
		//Informação do número da página
		int start = Integer.parseInt(request.getParameter("start"));
		
		//Informação da quantidade de itens por página na tabela
		int length = Integer.parseInt(request.getParameter("length"));
		
		//A cada request o parâmetro é incrementado, padrão interno para dar mais segurança na transação dos dados.
		int draw = Integer.parseInt(request.getParameter("draw"));
		
		int current = currentPage(start, length);
		
		String column = columnName(request);
		
		Sort.Direction direction = orderBy(request);
		
		String search = searchBy(request);
		
		Pageable pageable = PageRequest.of(current, length, direction, column);
		
		Page<Promocao> page = queryBy(search, repository, pageable);
		
		Map<String, Object> json = new LinkedHashMap<>();
		
		json.put("draw", draw);
		json.put("recordsTotal", page.getTotalElements());
		json.put("recordsFiltered", page.getTotalElements());
		json.put("data", page.getContent());
		
		return json;
	}

	 
	private Page<Promocao> queryBy(String search, PromocaoRepository repository, Pageable pageable) {
		if(search.isEmpty()) {
			return repository.findAll(pageable);
		}else {
			return repository.findByTituloOrSiteOrCategoria(search, pageable);
		}
		
		
	}

	private String searchBy(HttpServletRequest request) {
		return request.getParameter("search[value]").isEmpty() ?
				"" : request.getParameter("search[value]");
	}
	
	private Direction orderBy(HttpServletRequest request) {
		 String order = request.getParameter("order[0][dir]");
		 Sort.Direction sort = Sort.Direction.ASC;
		 
		 if(order.equalsIgnoreCase("desc")) {
			 sort = Sort.Direction.DESC;
		 }
		 
		 return sort;
	}

	
	private String columnName(HttpServletRequest request) {
		int iCol = Integer.parseInt(request.getParameter("order[0][column]"));
		return cols[iCol];
	}

	
	private int currentPage(int start, int lenght) {
		//0        1          2
		//0-9 | 10-19 | 20 -29
		return start / lenght;
	}
	
}
