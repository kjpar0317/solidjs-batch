package com.kjpar0317.batch.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorResponse {
	private int code;
	private String message;
	
	public static ErrorResponse of(int code, String message) {
		ErrorResponse errorResponse = new ErrorResponse();
		
		errorResponse.setCode(code);
		errorResponse.setMessage(message);
		
		return errorResponse;
	}
}
