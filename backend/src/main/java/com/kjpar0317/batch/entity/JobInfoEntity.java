package com.kjpar0317.batch.entity;

import java.time.LocalDateTime;

import com.kjpar0317.batch.annotation.CheckRequired;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@Entity
@Table(name = "jobInfo")
public class JobInfoEntity {
	@CheckRequired(field = "배치ID")
	@Id
	private String jobId;
	private String jobName;
	private String jobDesc;
	private String jobCronExpression;
	private String jobStats;
	private String jobParams;
	private String errorSkipYn;
	private String useYn;
	private String createdId;
	private LocalDateTime createdTime;
	private String modifiedId;
	private LocalDateTime modifiedTime;
}
