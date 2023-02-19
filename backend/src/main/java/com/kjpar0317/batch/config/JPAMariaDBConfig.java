package com.kjpar0317.batch.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.zaxxer.hikari.HikariDataSource;

import jakarta.persistence.EntityManagerFactory;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(entityManagerFactoryRef = "mariadbEntityManagerFactory", transactionManagerRef = "mariadbTransactionManager", basePackages = {
"com.kjpar0317.batch.**.repository" })
public class JPAMariaDBConfig {
	@Primary
	@Bean
	@ConfigurationProperties("dbconn.mariadb.datasource")
	public DataSourceProperties mariadbDataSourceProperties() {
		return new DataSourceProperties();
	}

	@Primary
	@Bean
	@ConfigurationProperties("dbconn.mariadb.datasource.hikari")
	public DataSource mariadbDataSource(
			@Qualifier("mariadbDataSourceProperties") DataSourceProperties dataSourceProperties) {
		return dataSourceProperties.initializeDataSourceBuilder().type(HikariDataSource.class).build();
	}

	@Primary
	@Bean
	public LocalContainerEntityManagerFactoryBean mariadbEntityManagerFactory(EntityManagerFactoryBuilder builder,
			@Qualifier("mariadbDataSource") DataSource dataSource) {
		return builder.dataSource(dataSource).packages("com.kjpar0317.batch.model")
				.persistenceUnit("mariadbEntityManager").build();
	}

	@Primary
	@Bean
	public PlatformTransactionManager mariadbTransactionManager(
			@Qualifier("mariadbEntityManagerFactory") EntityManagerFactory entityManagerFactory) {
		return new JpaTransactionManager(entityManagerFactory);
	}
}