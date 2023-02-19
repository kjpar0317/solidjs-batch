package com.kjpar0317.batch.config;

//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.r2dbc.config.AbstractR2dbcConfiguration;
//import org.springframework.data.r2dbc.repository.config.EnableR2dbcRepositories;
//import org.springframework.r2dbc.core.DatabaseClient;
//
//import io.r2dbc.spi.ConnectionFactories;
//import io.r2dbc.spi.ConnectionFactory;

//@Configuration
//@EnableR2dbcRepositories(value="mariaDbClient", basePackages={"com.kjpar0317.batch"})
//public class R2DBCMariaDBConfig extends AbstractR2dbcConfiguration{
//
//    @Bean(name="mariadbSqlConnFactory")
//	public ConnectionFactory connectionFactory(){
//      return ConnectionFactories.get("r2dbc:postgresql://<host>:5432/<database>");
//    }
//
//    @Bean(name="mariaDbClient")
//	public DatabaseClient databaseClient(){
//      return DatabaseClient.create(this.connectionFactory());
//    }
//}