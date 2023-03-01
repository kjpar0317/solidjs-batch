package com.kjpar0317.batch.exception;

import lombok.Getter;

@Getter
public class CustomErrorException extends Exception {
	private static final long serialVersionUID = 1L;
	private int errorCode = 888;
	private String errorMessage = "";
	
	public CustomErrorException(String errorMsg) {
		super(errorMsg);
		this.errorMessage = errorMsg;
	}
}
