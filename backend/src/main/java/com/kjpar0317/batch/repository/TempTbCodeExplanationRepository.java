package com.kjpar0317.batch.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kjpar0317.batch.entity.TmpCodeExplanationEntity;


public interface TempTbCodeExplanationRepository extends JpaRepository<TmpCodeExplanationEntity, Integer> {
}