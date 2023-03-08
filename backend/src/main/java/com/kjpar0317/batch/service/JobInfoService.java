package com.kjpar0317.batch.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.kjpar0317.batch.entity.JobInfoEntity;
import com.kjpar0317.batch.repository.JobInfoRepository;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@Service
public class JobInfoService {
	private final JobInfoRepository repository;
	
	public Flux<JobInfoEntity> getJobInfoList() {
		return Flux.fromIterable(repository.findAll());
	}
	
	public Mono<JobInfoEntity> saveJobInfo(JobInfoEntity entity) {
		entity.setCreatedId("batch");
		entity.setCreatedTime(LocalDateTime.now());
		entity.setModifiedId("batch");
		entity.setModifiedTime(LocalDateTime.now());
		return Mono.fromCallable(() -> repository.save(entity));
	}
	
	public Mono<?> deleteJobInfo(JobInfoEntity entity) {
		repository.delete(entity);
		return Mono.empty();
	}
}
