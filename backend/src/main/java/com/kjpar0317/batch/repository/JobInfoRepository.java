package com.kjpar0317.batch.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kjpar0317.batch.entity.JobInfoEntity;

public interface JobInfoRepository extends JpaRepository<JobInfoEntity, String> {
	List<JobInfoEntity> findAllByUseYn(String useYn);
}