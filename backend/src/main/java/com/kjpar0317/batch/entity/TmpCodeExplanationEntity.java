package com.kjpar0317.batch.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@Table(name = "TEMP_TB_CODE_EXPLANATION")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TmpCodeExplanationEntity {
	@Id
	private Integer ceSeq;
	private String ceContent;
	private Integer cpSeq;
}