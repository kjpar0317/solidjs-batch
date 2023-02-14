package com.kjpar0317.batch.handler;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import com.kjpar0317.batch.model.JobInfo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class JobHandler {
//	private final JobLauncher jobLauncher;
//
//	public void startJob(JobInfo jobInfo) {
//		ApplicationContext context = ApplicationContextProvider.getApplicationContext();
//		
//		try {
//			JobParameters jobParameters = new JobParametersBuilder().addLong("time", System.currentTimeMillis())
//					.toJobParameters();
//
//			jobLauncher.run((Job) context.getBean(jobInfo.getJobId()), jobParameters);
//		} catch (JobExecutionAlreadyRunningException | JobRestartException | JobInstanceAlreadyCompleteException
//				| JobParametersInvalidException e) {
//			log.error("{}", e.getMessage());
//		}
//	}
}
