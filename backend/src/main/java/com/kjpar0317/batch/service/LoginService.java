package com.kjpar0317.batch.service;

import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerWebInputException;

//import com.kjpar0317.batch.auth.JwtTokenProvider;
//
//import lombok.RequiredArgsConstructor;
//import reactor.core.publisher.Mono;
//
//@Service
//@RequiredArgsConstructor
//public class LoginService {
//    private final JwtTokenProvider jwtTokenProvider;
////    private final ReactiveAuthenticationManager authenticationManager;
//
//
////    public Mono<LoginResponseDto> login(LoginRequestDto loginRequestDto) {
////        if (loginRequestDto.getPassword() == null || loginRequestDto.getUsername() == null)
////            return Mono.error(new ServerWebInputException("User Input Invalidation"));
////
////        Authentication authentication = new UsernamePasswordAuthenticationToken(loginRequestDto.getUsername(),
////                loginRequestDto.getPassword());
////        return authenticationManager.authenticate(authentication)
////                .map(jwtTokenProvider::createToken)
////                .map(token -> LoginResponseDto.builder().token(token).build());
////    }
//}