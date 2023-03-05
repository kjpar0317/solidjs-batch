package com.kjpar0317.batch.job.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.partition.support.TaskExecutorPartitionHandler;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.transaction.PlatformTransactionManager;

import com.kjpar0317.batch.entity.CodeExplanationEntity;
import com.kjpar0317.batch.entity.TmpCodeExplanationEntity;
import com.kjpar0317.batch.job.listener.JobCompleteListener;
import com.kjpar0317.batch.job.partitoner.TbCodeExplanationPartitoner;
import com.kjpar0317.batch.repository.TbCodeExplanationRepository;
import com.kjpar0317.batch.repository.TempTbCodeExplanationRepository;

import jakarta.persistence.EntityManagerFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class MoveJpaPartitionerJob {
	public final JobRepository jobRepository;
	private final EntityManagerFactory entityManagerFactory;
	private final PlatformTransactionManager transactionManager;
	private final JobCompleteListener jobCompleteListener;
	private final TbCodeExplanationRepository srcRepository;
	private final TempTbCodeExplanationRepository targetRepository;
	@Value("${batch.chunkSize}")
	private int chunkSize;
	@Value("${batch.partitionerSize}")
	private int partitionerSize;
	
	
	private final String JOB_NAME = "MoveJpaPartitionerJob";
	
    @Bean(name = JOB_NAME+"_taskPool")
    TaskExecutor executor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(partitionerSize);
        executor.setMaxPoolSize(partitionerSize);
        executor.setThreadNamePrefix("partition-thread");
        executor.setWaitForTasksToCompleteOnShutdown(Boolean.TRUE);
        executor.initialize();
        return executor;
    }
    
	@Bean(name = JOB_NAME+"_partitionHandler")
	TaskExecutorPartitionHandler partitionHandler() {
	    TaskExecutorPartitionHandler partitionHandler = new TaskExecutorPartitionHandler(); // (1)
	    partitionHandler.setStep(slaveStep()); // (2)
	    partitionHandler.setTaskExecutor(executor()); // (3)
	    partitionHandler.setGridSize(partitionerSize); // (4)
	    return partitionHandler;
	}
	
	@Bean(name = JOB_NAME +"_partitioner")
	@StepScope
	TbCodeExplanationPartitoner partitioner() {
		long min = srcRepository.getMinCeSeq().get();
		long max = srcRepository.getMaxCeSeq().get();
	    return new TbCodeExplanationPartitoner(min, max);
	}
	
    @Bean(name = JOB_NAME)
    Job job() {
        return new JobBuilder(JOB_NAME, jobRepository)
                .start(masterStep())
                .preventRestart()
                .listener(jobCompleteListener)
                .build();
    }
	
	@Bean(name = JOB_NAME + "_masterStep")
	Step masterStep() {
	    return new StepBuilder(JOB_NAME + "_masterStep", jobRepository)
	            .partitioner("step1", partitioner())
	            .step(slaveStep())
	            .partitionHandler(partitionHandler())
	            .build();
	}
	
	@Bean(name = JOB_NAME + "_slaveStep")
	Step slaveStep() {
	    return new StepBuilder(JOB_NAME + "_slaveStep", jobRepository)
	    		.<CodeExplanationEntity, TmpCodeExplanationEntity>chunk(chunkSize, transactionManager)
	    		.reader(reader(null, null))
	            .processor(processor())
	            .writer(writer())
	            .build();
	}

	@Bean(name = JOB_NAME +"_reader")
	@StepScope
	JpaPagingItemReader<CodeExplanationEntity> reader(
	        @Value("#{stepExecutionContext[minId]}") Long minId,
	        @Value("#{stepExecutionContext[maxId]}") Long maxId) {

	    Map<String, Object> params = new HashMap<>();
	    params.put("minId", minId);
	    params.put("maxId", maxId);

	    log.info("reader minId={}, maxId={}", minId, maxId);

	    return new JpaPagingItemReaderBuilder<CodeExplanationEntity>()
	            .name(JOB_NAME +"_reader")
	            .entityManagerFactory(entityManagerFactory)
	            .pageSize(chunkSize)
	            .queryString("""
	                    SELECT p 
	                    FROM CodeExplanationEntity p 
	                    WHERE p.ceSeq between :minId and :maxId	                    
	            		""")	            
	            .parameterValues(params)
	            .build();
	}
	
    private ItemProcessor<CodeExplanationEntity, TmpCodeExplanationEntity> processor() {
        return src -> TmpCodeExplanationEntity.builder().ceSeq(src.getCeSeq()).ceContent(src.getCeContent()).cpSeq(src.getCpSeq()).build();
    }
    
    @Bean(name = JOB_NAME +"_writer")
    @StepScope
    ItemWriter<TmpCodeExplanationEntity> writer() {
        return list -> targetRepository.saveAll(list);
    }
}
