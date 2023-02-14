package com.kjpar0317.batch.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class JobCommon {
	private Long min;
	private Long max;
	private Long count;
}
