package com.loja.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.loja.demo.domain.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

}
