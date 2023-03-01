package com.kjpar0317.batch.job.config.tasklet;

import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.StepExecutionListener;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.stereotype.Component;

import com.kjpar0317.batch.repository.TempTbCodeExplanationRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@StepScope
@Component
public class TrashTbCodeExplanationTasklet implements Tasklet, StepExecutionListener {
	private final TempTbCodeExplanationRepository repository;
	
    @Override
    public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) {
    	repository.deleteAll();
        return RepeatStatus.FINISHED;
    }
}
