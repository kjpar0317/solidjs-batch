package com.kjpar0317.batch.exception;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.support.WebExchangeBindException;

import com.kjpar0317.batch.model.ErrorResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class ControllerExceptionHandler {
    @ExceptionHandler(BadCredentialsException.class)
    protected ResponseEntity<ErrorResponse> handleBadCredentialsException(BadCredentialsException e) {
        log.error("BadCredentialsException: {}", e);
        return new ResponseEntity<>(ErrorResponse.of(HttpStatus.FORBIDDEN.value(), "로그인 정보가 없거나 맞지 않습니다."), HttpStatus.FORBIDDEN);
    }
    
    @ExceptionHandler(CustomErrorException.class)
    protected ResponseEntity<ErrorResponse> handleCustomErrorException(CustomErrorException e) {
        log.error("handleCustomErrorException: {}", e);
        return new ResponseEntity<>(ErrorResponse.of(e.getErrorCode(), e.getErrorMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    @ExceptionHandler(WebExchangeBindException.class)
    public ResponseEntity<List<String>> handleException(WebExchangeBindException e) {
        var errors = e.getBindingResult()
                .getAllErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.toList());
        return ResponseEntity.badRequest().body(errors);
    }
}
