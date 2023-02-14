package com.kjpar0317.batch.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.transaction.annotation.EnableTransactionManagement;

//@Configuration
//@EnableTransactionManagement
//public class MariaDBConfig {
//	@Bean(name = "mariadbDatasource", destroyMethod = "close")
//	@Primary
//	@ConfigurationProperties(prefix = "datasource.mariadb")
//	public DataSource maraidbDatasource() {
//		return DataSourceBuilder.create().build();
//	}
//
//	@Bean(name = "mariadbSessionFactory")
//	@Primary
//	public SqlSessionFactory mariadbSessionFactory(@Qualifier("mariadbDatasource") DataSource mariadbDatasource,
//			ApplicationContext applicationContext) throws Exception {
//		SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
//		sqlSessionFactoryBean.setDataSource(mariadbDatasource);
//		sqlSessionFactoryBean.setTypeAliasesPackage("com.innogrid.tabcloudit.batch.model");
//		sqlSessionFactoryBean.setMapperLocations(applicationContext.getResources("classpath:mapper/mariadb/**/*.xml"));
//		return sqlSessionFactoryBean.getObject();
//	}
//
//	@Bean(name = "maraidbSessionTemplate")
//	@Primary
//	public SqlSessionTemplate mariadbSqlSessionTemplate(
//			@Qualifier("mariadbSessionFactory") SqlSessionFactory mariadbSessionFactory) {
//		return new SqlSessionTemplate(mariadbSessionFactory);
//	}
//}