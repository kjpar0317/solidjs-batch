package com.kjpar0317.batch.config;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.boot.orm.jpa.hibernate.SpringImplicitNamingStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.kjpar0317.batch.utils.ImprovedNamingStrategy;
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
	DataSourceProperties mariadbDataSourceProperties() {
		return new DataSourceProperties();
	}

	@Primary
	@Bean
	@ConfigurationProperties("dbconn.mariadb.datasource.hikari")
	DataSource mariadbDataSource(
			@Qualifier("mariadbDataSourceProperties") DataSourceProperties dataSourceProperties) {
		return dataSourceProperties.initializeDataSourceBuilder().type(HikariDataSource.class).build();
	}

	@Primary
	@Bean
	LocalContainerEntityManagerFactoryBean mariadbEntityManagerFactory(EntityManagerFactoryBuilder builder,
			@Qualifier("mariadbDataSource") DataSource dataSource) {
		return builder.dataSource(dataSource)
				.properties(jpaProperties())
				.packages("com.kjpar0317.batch.**.entity")
				.persistenceUnit("mariadbEntityManager")
				.build();
	}

	@Primary
	@Bean
	PlatformTransactionManager mariadbTransactionManager(
			@Qualifier("mariadbEntityManagerFactory") EntityManagerFactory entityManagerFactory) {
		return new JpaTransactionManager(entityManagerFactory);
	}
	
	protected Map<String, Object> jpaProperties() {
	    Map<String, Object> props = new HashMap<>();
	    
	    props.put("hibernate.physical_naming_strategy", ImprovedNamingStrategy.class.getName());
	    props.put("hibernate.implicit_naming_strategy", SpringImplicitNamingStrategy.class.getName());
        props.put("hibernate.dialect", "org.hibernate.dialect.MariaDBDialect");
        props.put("hibernate.hbm2ddl.auto","update");
        props.put("hibernate.show_sql", "true");

        return props;
	}
}