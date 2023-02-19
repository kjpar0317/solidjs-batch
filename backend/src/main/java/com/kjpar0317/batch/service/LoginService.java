package com.kjpar0317.batch.service;

import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerWebInputException;

import com.kjpar0317.batch.auth.JwtTokenProvider;
import com.kjpar0317.batch.model.Login;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@Service
public class LoginService {
	private final JwtTokenProvider jwtTokenProvider;
	private final ReactiveAuthenticationManager authenticationManager;

	public Mono<Login> login(Login login) {
		if (login.getPassword() == null || login.getId() == null)
			return Mono.error(new ServerWebInputException("User Input Invalidation"));

		Authentication authentication = new UsernamePasswordAuthenticationToken(login.getId(), login.getPassword());
		return authenticationManager.authenticate(authentication).map(jwtTokenProvider::createToken)
				.map(token -> Login.builder().token(token).build());
	}
}