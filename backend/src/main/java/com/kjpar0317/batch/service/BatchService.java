package com.kjpar0317.batch.service;

import org.springframework.stereotype.Service;

import com.kjpar0317.batch.entity.JobInfoEntity;
import com.kjpar0317.batch.exception.CustomErrorException;
import com.kjpar0317.batch.handler.JobHandler;
import com.kjpar0317.batch.repository.JobInfoRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class BatchService {
	private final JobHandler jobHandler;
	private final ScheduleTaskService taskService;
	private final JobInfoRepository repository;
	
	public void play(JobInfoEntity reqJobInfo) throws CustomErrorException {
		JobInfoEntity jobInfo = repository.findById(reqJobInfo.getJobId()).orElseThrow(() -> new CustomErrorException("데이터가 없습니다."));

		jobHandler.startJob(jobInfo);
	}
	
	public void start(JobInfoEntity reqJobInfo) throws CustomErrorException {
		reqJobInfo.setUseYn("Y");
		JobInfoEntity jobInfo = repository.findById(reqJobInfo.getJobId()).orElseThrow(() -> new CustomErrorException("데이터가 없습니다."));
		
		taskService.addTaskToScheduler(jobInfo.getJobId(), () -> jobHandler.startJob(jobInfo), jobInfo.getJobCronExpression());
	}
	
	public void stop(JobInfoEntity reqJobInfo) throws CustomErrorException {
		taskService.removeTaskFromScheduler(reqJobInfo.getJobId());
	}
	
	public void startup() {
		repository.findAllByUseYn("Y").parallelStream().forEach(f -> {
			try {
				this.start(f);
			} catch (CustomErrorException e) {
				log.error(e.getErrorMessage());
			}
		});
	}
	
	public void shutdown() {
		taskService.removeAllTaskFromScheduler();
	}
}
