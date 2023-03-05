package com.kjpar0317.batch.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kjpar0317.batch.entity.JobInfoEntity;
import com.kjpar0317.batch.service.JobInfoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/jobInfo")
public class JobInfoController {
	private final JobInfoService service;
	
	@PostMapping
	public Flux<JobInfoEntity> getJobInfoList(@RequestBody JobInfoEntity entity) {
		return service.getJobInfoList();
	}
	
	@PutMapping
	public Mono<JobInfoEntity> saveJobInfo(@Valid @RequestBody JobInfoEntity entity) {
		return service.saveJobInfo(entity);
	}
	
	@DeleteMapping
	public Mono<?> deleteJobInfo(@RequestBody JobInfoEntity entity) {
		return service.deleteJobInfo(entity);
	}
}
