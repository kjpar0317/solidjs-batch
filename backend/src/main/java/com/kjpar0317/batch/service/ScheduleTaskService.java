package com.kjpar0317.batch.service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;

import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ScheduleTaskService {
	@Resource(name = "defaultTaskScheduler")
	private final TaskScheduler scheduler;

	// A map for keeping scheduled tasks
	private Map<String, ScheduledFuture<?>> jobsMap = new HashMap<>();

	// Schedule Task to be executed every night at 00 or 12 am
	public void addTaskToScheduler(String jobId, Runnable task, String cronExpression) {
		ScheduledFuture<?> scheduledTask = scheduler.schedule(task, new CronTrigger(cronExpression));
		jobsMap.put(jobId, scheduledTask);
	}

	// Remove scheduled task
	public void removeTaskFromScheduler(String jobId) {
		ScheduledFuture<?> scheduledTask = jobsMap.get(jobId);
		if (scheduledTask != null) {
			scheduledTask.cancel(true);
//			jobsMap.put(jobId, null);
			jobsMap.remove(jobId);
		}
	}

	public void removeAllTaskFromScheduler() {
		jobsMap.entrySet().parallelStream().forEach(f -> this.removeTaskFromScheduler(f.getKey()));
	}
	
	// A context refresh event listener
	@EventListener({ ContextRefreshedEvent.class })
	void contextRefreshedEvent() {
		// Get all tasks from DB and reschedule them in case of context restarted
	}
}