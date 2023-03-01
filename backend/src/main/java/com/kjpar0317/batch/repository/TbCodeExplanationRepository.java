package com.kjpar0317.batch.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kjpar0317.batch.entity.CodeExplanationEntity;

public interface TbCodeExplanationRepository extends JpaRepository<CodeExplanationEntity, Integer> {
//	@Query(value = "SELECT MIN(CE_SEQ) FROM TB_CODE_EXPLANATION")
//	Optional<Integer> getMinCeSeq();
//	@Query(value = "SELECT MAX(CE_SEQ) FROM TB_CODE_EXPLANATION")
//	Optional<Integer> getMaxCeSeq();
	@Query(value = "SELECT min(t.ceSeq) FROM CodeExplanationEntity t")
	Optional<Integer> getMinCeSeq();
	@Query(value = "SELECT max(t.ceSeq) FROM CodeExplanationEntity t")
	Optional<Integer> getMaxCeSeq();
}