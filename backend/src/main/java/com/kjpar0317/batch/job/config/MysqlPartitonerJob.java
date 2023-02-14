package com.kjpar0317.batch.job.config;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.JobScope;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

import jakarta.annotation.Resource;

//@Configuration
//@EnableBatchProcessing
//public class MysqlPartitonerJob {
//	public final JobRepository jobRepository;
//	@Autowired
//	public StepBuilderFactory stepBuilderFactory;
//	
//	@Resource(name = "tiberodbSessionFactory")
//	private SqlSessionFactory tiberodbSessionFactory;
//	@Resource(name="tiberodbTransactionManager")
//	private PlatformTransactionManager tiberodbTransactionManager;
//	
//	@Autowired
//	private JobCompleteListener jobListener;
//
//	@Autowired
//	private TestStepListener stepListner;
//	@Autowired
//	private JobItemProcessor processor;
//	@Autowired
//	private JobItemWriter writer;
//	
//	@Value("${batch.chunk-size}")
//	private String chunkSize;
//	
//	@Value("${batch.partition-size}")
//	private String partitionSize; 
//    
//    @Bean
//    MysqlColumnRangePartitioner partitioner() {
//    	MysqlColumnRangePartitioner columnRangePartitioner = new MysqlColumnRangePartitioner();
//    	columnRangePartitioner.init(tiberodbSessionFactory, "SELECT_TEST_DUMMY");
//        return columnRangePartitioner;
//    }
//    
//    // tibero 1.7 지원 안 함
////	@Bean
////	@StepScope
////	public MyBatisCursorItemReader<Test> reader(@Value("#{stepExecutionContext}") Test contextParams) {
////	  return new MyBatisCursorItemReaderBuilder<Test>()
////	      .sqlSessionFactory(tiberodbSessionFactory)
////	      .queryId("com.innogrid.tabcloudit.batch.tiberodb.test.selectDummy")
////	      .parameterValues(contextParams)
////	      .build();
////	}
//	
//    @Bean
//    public JpaPagingItemReader<Pay> customItemWriterReader() {
//        return new JpaPagingItemReaderBuilder<Pay>()
//                .name("customItemWriterReader")
//                .entityManagerFactory(entityManagerFactory)
//                .pageSize(chunkSize)
//                .queryString("SELECT p FROM Pay p")
//                .build();
//    }
//
//    @Bean
//	@StepScope
//	ItemReader<Test> processJobReader(@Value("#{stepExecutionContext}") Map<String, Object> contextParams) {
//		try(SqlSession session = tiberodbSessionFactory.openSession()) {
//			return new LinkedListItemReader<>(session.selectList("com.innogrid.tabcloudit.batch.tiberodb.test.selectDummy", contextParams));
//		} catch (Exception e) {
//			return null;
//		}
//	}
//	
//	@Bean(name="processJob")
//	Job processJob() throws Exception {
//		return new JobBuilder("테스트잡", jobRepository)
//				.incrementer(new RunIdIncrementer())
//				.listener(jobListener)
//				.start(testMasterStep())
//				.preventRestart()
//				.build();
//	}
//
//	@Bean
//	@JobScope
//	Step testMasterStep() throws Exception {
//		return new StepBuilder("test Master Step", jobRepository)
//				.partitioner(testSlaveStep1().getName(), partitioner())
//				.step(testSlaveStep1())
//				.gridSize(Integer.parseInt(partitionSize))
//				.taskExecutor(BatchUtils.getDefaultTaskExecutor(Integer.parseInt(partitionSize)))
//				.allowStartIfComplete(true)
//				.build();
//	}
//
//	@Bean
//	Step testSlaveStep1() throws Exception {
//		return new StepBuilder("test Slave step", jobRepository)
//				.<Test, Test> chunk(Integer.parseInt(chunkSize))
//				.reader(processJobReader(null))
//				.processor(processor)
//				.writer(writer)
//				.faultTolerant()
//				.skipPolicy(new CustomSkipPolicy())
//				.listener(stepListner)
//				.allowStartIfComplete(true)
//				.transactionManager(tiberodbTransactionManager)
//				.transactionAttribute(BatchUtils.getDefaultTransactionAttribute())
//				.build();
//	}
//}
