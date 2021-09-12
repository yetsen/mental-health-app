package com.mentalhealth.app.repository;

import com.mentalhealth.app.domain.Block;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlockRepository  extends JpaRepository<Block, Long> {

    @Override List<Block> findAll ();

    List<Block> findBySurvey_Id(Long surveyId);

    Block findBySurvey_IdAndName(Long surveyId, String name);
}
