package com.loja.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.loja.demo.domain.SocialMetaTag;
import com.loja.demo.service.SocialMetaTagService;

@SuppressWarnings("unused")
@SpringBootApplication
public class DemoApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Autowired
	SocialMetaTagService service;
	
	@Override
	public void run(String... args) throws Exception {
		/*
		 * SocialMetaTag tag = service.getSocialMetaTagByUrl(
		 * "https://www.pichau.com.br/mouse-gamer-logitech-g403-prodigy-rgb-usb-preto-910-004823"
		 * ); System.out.println(tag.toString());
		 */
	 
	}

}
