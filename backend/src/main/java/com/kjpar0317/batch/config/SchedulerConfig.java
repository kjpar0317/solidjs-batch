package com.kjpar0317.batch.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.kjpar0317.batch.handler.JobHandler;
import com.kjpar0317.batch.service.JobInfoService;
import com.kjpar0317.batch.service.ScheduleTaskService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableScheduling
public class SchedulerConfig  {
	private final ScheduleTaskService service;
	private final JobHandler jobHandler;
	private final JobInfoService jobInfoService;
    
    @Bean
    int startSchedule() {
    	jobInfoService.getJobInfoList()
    		.filter(f -> "Y".equals(f.getUseYn()))
    		.subscribe(s -> service.addTaskToScheduler(s.getJobId(), () -> jobHandler.startJob(s), s.getJobCronExpression()));
		return 0;
    }
}