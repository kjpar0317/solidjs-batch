package com.kjpar0317.batch.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
@EnableAsync
public class AsyncConfig {
//	private ThreadPoolTaskExecutor executor;
	@Bean
	TaskExecutor threadPoolTaskExecutor() {
		ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
		executor.setCorePoolSize(Runtime.getRuntime().availableProcessors());
		executor.setMaxPoolSize(500);
		executor.initialize();
		return executor;
	}
}