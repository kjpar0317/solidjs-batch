package com.kjpar0317.batch.model;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class JobInfo {
	private String jobId;
	private String jobName;
	private String jobDesc;
	private String jobCronExpression;
	private String jobStats;
	private String createdId;
	private LocalDateTime createdTime;
	private String modifiedId;
	private LocalDateTime modifiedTime;
}
