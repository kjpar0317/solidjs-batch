package com.kjpar0317.batch.model;

import com.kjpar0317.batch.annotation.CheckRequired;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Login {
	@CheckRequired(field="아이디")
	private String id;
	@CheckRequired(field="패스워드")
	private String password;
	private String token;
}
