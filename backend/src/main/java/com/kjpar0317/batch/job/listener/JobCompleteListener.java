package com.kjpar0317.batch.job.listener;

import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.configuration.annotation.JobScope;
import org.springframework.batch.core.listener.CompositeJobExecutionListener;
import org.springframework.stereotype.Component;

@JobScope
@Component
public class JobCompleteListener extends CompositeJobExecutionListener {
	@Override
	public void afterJob(JobExecution jobExecution) {
		if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
			System.out.println("BATCH JOB COMPLETED SUCCESSFULLY");
		} else {
			System.out.println("BATCH JOB COMPLETED SUCCESSFULLY");
		}
	}

}