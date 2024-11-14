package com.kjpar0317.batch.service;

import com.kjpar0317.batch.utils.PBKDF2Encoder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerWebInputException;

import com.kjpar0317.batch.auth.JwtTokenProvider;
import com.kjpar0317.batch.model.Login;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Slf4j
@RequiredArgsConstructor
@Service
public class LoginService {
	private final JwtTokenProvider jwtTokenProvider;
	private final ReactiveAuthenticationManager authenticationManager;
	private final PBKDF2Encoder pbkdf2Encoder;

	public Mono<Login> login(Login login) {
		if (login.getPassword() == null || login.getId() == null)
			return Mono.error(new ServerWebInputException("User Input Invalidation"));

		String password = pbkdf2Encoder.encode("test");
		Authentication authentication = new UsernamePasswordAuthenticationToken(login.getId(), login.getPassword());

		return authenticationManager.authenticate(authentication)
				.doOnError(err -> log.error(err.getMessage()))
				.map(jwtTokenProvider::createToken)
				.map(token -> Login.builder().token(token).build());
	}
}