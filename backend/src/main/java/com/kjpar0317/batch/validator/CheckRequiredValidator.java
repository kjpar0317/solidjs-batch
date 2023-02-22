package com.kjpar0317.batch.validator;

import org.springframework.util.StringUtils;

import com.kjpar0317.batch.annotation.CheckRequired;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CheckRequiredValidator implements ConstraintValidator<CheckRequired, String> {
	private String field;
	private String message;
	
    @Override
    public void initialize(CheckRequired constraintAnnotation) {
        this.field = constraintAnnotation.field();
        this.message = constraintAnnotation.message();
    }
    
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (!StringUtils.hasText(value)) {
        	if(!StringUtils.hasText(this.field)) {
        		StringBuilder sb = new StringBuilder();
        		
        		sb.append(this.field).append("은/는 ").append(this.message);
        		
        		this.customMessageForValidation(context, sb.toString());
        	}
        	
            return false;
        }
        return true;
    }
    
    private void customMessageForValidation(ConstraintValidatorContext constraintContext, String message) {
        // build new violation message and add it
        constraintContext.buildConstraintViolationWithTemplate(message).addConstraintViolation();
    }
}
