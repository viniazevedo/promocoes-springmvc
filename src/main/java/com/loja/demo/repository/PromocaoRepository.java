package com.loja.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.loja.demo.domain.Promocao;

public interface PromocaoRepository extends JpaRepository<Promocao, Long>{

	
}
