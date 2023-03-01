package com.kjpar0317.batch.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kjpar0317.batch.entity.JobInfoEntity;
import com.kjpar0317.batch.exception.CustomErrorException;
import com.kjpar0317.batch.model.Login;
import com.kjpar0317.batch.service.BatchService;
import com.kjpar0317.batch.service.LoginService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@RestController
@RequestMapping("/batch")
public class BatchController {
	private final LoginService loginService;
	private final BatchService batchService;
	
	@PostMapping("/login")
	public Mono<?> login(@Valid @RequestBody Login login) {
		return loginService.login(login).map(f -> {
			Map<String, Object> tmpMap = new HashMap<>();
			tmpMap.put("token", f.getToken());
			return tmpMap;
		});
	}
	
	@PostMapping("/retoken")
	public Mono<?> login() {
		return Mono.just("retoken 들어 옴");
	}
	
	@GetMapping
	public Flux<?> getBatchList() {
		return Flux.just(Arrays.asList("1", "2", "3"));
	}
	
	@PostMapping("/play")
	public Mono<?> play(@RequestBody Mono<@Valid JobInfoEntity> jobInfo) throws CustomErrorException {
		return jobInfo.flatMap((f) -> {
			try {
				batchService.play(f);
			} catch (CustomErrorException e) {}
			return Mono.empty();
		}).onErrorMap(error -> new RuntimeException("CustomErrorException"));
	}
}
