package com.kjpar0317.batch.config;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Optional;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UserDetailsRepositoryReactiveAuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.server.WebFilter;

import com.kjpar0317.batch.auth.JwtTokenAuthenticationFilter;
import com.kjpar0317.batch.auth.JwtTokenProvider;
import com.kjpar0317.batch.auth.JwtUserInfo;
import com.kjpar0317.batch.model.UsersEntity;
import com.kjpar0317.batch.repository.UsersRepository;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class SecurityConfig {
//	private final ApplicationContext applicationContext;
	private final JwtTokenProvider jwtTokenProvider;

//	@Bean
//	@DependsOn({ "methodSecurityExpressionHandler" })
//	SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http, JwtTokenProvider jwtTokenProvider,
//			ReactiveAuthenticationManager reactiveAuthenticationManager) {
//		DefaultMethodSecurityExpressionHandler defaultWebSecurityExpressionHandler = this.applicationContext
//				.getBean(DefaultMethodSecurityExpressionHandler.class);
//		defaultWebSecurityExpressionHandler.setPermissionEvaluator(myPermissionEvaluator());
//
//		return http.exceptionHandling(
//				exceptionHandlingSpec -> exceptionHandlingSpec.authenticationEntryPoint((exchange, ex) -> {
//					return Mono.fromRunnable(() -> {
//						exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
//					});
//				}).accessDeniedHandler((exchange, denied) -> {
//					return Mono.fromRunnable(() -> {
//						exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
//					});
//				})).cors().disable().csrf().disable().formLogin().disable().httpBasic().disable()
////				.authenticationManager(reactiveAuthenticationManager)
//				.securityContextRepository(NoOpServerSecurityContextRepository.getInstance())
//				.authorizeExchange(exchange -> exchange.pathMatchers(HttpMethod.OPTIONS).permitAll()
//						.pathMatchers("/login").permitAll().anyExchange().authenticated())
//				.addFilterAt(new JwtTokenAuthenticationFilter(jwtTokenProvider), SecurityWebFiltersOrder.HTTP_BASIC)
//				.build();
//	}

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
		return http.exceptionHandling(
		exceptionHandlingSpec -> exceptionHandlingSpec.authenticationEntryPoint((exchange, ex) -> {
			return Mono.fromRunnable(() -> {
				exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
			});
		}).accessDeniedHandler((exchange, denied) -> {
			return Mono.fromRunnable(() -> {
				exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
			});
		})).cors().disable().csrf().disable().formLogin().disable().httpBasic().disable()
//		.authenticationManager(reactiveAuthenticationManager)
		.securityContextRepository(NoOpServerSecurityContextRepository.getInstance())
		.authorizeExchange(exchange -> exchange.pathMatchers(HttpMethod.OPTIONS).permitAll()
				.pathMatchers("/batch/login").permitAll().anyExchange().authenticated())
		.addFilterBefore((WebFilter) new JwtTokenAuthenticationFilter(jwtTokenProvider), SecurityWebFiltersOrder.HTTP_BASIC)
		.build();
    }
    
    @Bean
    CorsConfigurationSource corsConfiguration() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.applyPermitDefaultValues();
        corsConfig.addAllowedMethod(HttpMethod.PUT);
        corsConfig.addAllowedMethod(HttpMethod.DELETE);
        corsConfig.setAllowedOrigins(Arrays.asList("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);
        return source;
    }
    
	@Bean
	PermissionEvaluator myPermissionEvaluator() {
		return new PermissionEvaluator() {
			@Override
			public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {
				if (authentication.getAuthorities().stream()
						.filter(grantedAuthority -> grantedAuthority.getAuthority().equals(targetDomainObject))
						.count() > 0)
					return true;
				return false;
			}

			@Override
			public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType,
					Object permission) {
				return false;
			}
		};
	}

	@Bean
	public ReactiveUserDetailsService userDetailsService(UsersRepository userRepository) {
		return username -> {
			Optional<UsersEntity> usersEntity = userRepository.findById(username);

			if(usersEntity.isEmpty()) {
				return Mono.empty();
			}
			
			JwtUserInfo jwtInfo = new JwtUserInfo();
			jwtInfo.setUsername(usersEntity.get().getName());
			jwtInfo.setPassword(usersEntity.get().getPassword());
			jwtInfo.setEnabled(usersEntity.get().isEnabled());
			jwtInfo.setAccountNonExpired(usersEntity.get().isAccountNonExpired());
			jwtInfo.setCredentialsNonExpired(usersEntity.get().isCredentialsNonExpired());
			jwtInfo.setAccountNonLocked(usersEntity.get().isAccountNonLocked());

//			List<String> permissions = jwtInfo.getPermissions();
//			usUserMaster.getUsUserRoleEntityList().stream().forEach(usUserRoleEntity -> {
//				usUserRoleEntity.getUsRoleEntity().getUsRolePermissionEntityList().stream()
//						.forEach(usRolePermissionEntity -> permissions
//								.add(usRolePermissionEntity.getUsPermissionEntity().getPermissionCode()));
//			});
			return Mono.just(jwtInfo);
		};
	}

	@Bean
	public ReactiveAuthenticationManager reactiveAuthenticationManager(ReactiveUserDetailsService userDetailsService,
			PasswordEncoder passwordEncoder) {
		var authenticationManager = new UserDetailsRepositoryReactiveAuthenticationManager(userDetailsService);
		authenticationManager.setPasswordEncoder(passwordEncoder);
		return authenticationManager;
	}
}