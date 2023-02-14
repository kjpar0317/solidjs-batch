package com.kjpar0317.batch.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/batch")
public class BatchController {
	@PostMapping("/login")
	public Mono<?> login(@RequestBody Map<String, Object> map) {
		map.put("token", "asdfasdfafsd");
		return Mono.just(map);
	}
}
