package com.kjpar0317.batch.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

import com.kjpar0317.batch.service.ScheduleTaskService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableScheduling
public class SchedulerConfig  {
	private final ScheduleTaskService service;
	
    @Bean
    TaskScheduler taskScheduler() {
        ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();
        threadPoolTaskScheduler.setPoolSize(500);
        threadPoolTaskScheduler.setThreadNamePrefix("ThreadPoolTaskScheduler");
        return threadPoolTaskScheduler;
    }
    
    @Bean
    void startSchedule() {
    	service.addTaskToScheduler("TestConfig", () -> {System.out.println("asdfasfd");}, "2 * * * * ?");
    }
}