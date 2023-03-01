package com.kjpar0317.batch.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface CheckRequired {
	String field() default "";
	
    String message() default "필수로 입력하셔야 합니다.";

    @SuppressWarnings("rawtypes")
	Class[] groups() default {};

    @SuppressWarnings("rawtypes")
	Class[] payload() default {};
}