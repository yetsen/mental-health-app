package com.mentalhealth.app.repository;

import com.mentalhealth.app.domain.Block;
import com.mentalhealth.app.domain.Question;
import com.mentalhealth.app.enums.QuestionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    Optional<Question> findByName(String name);

    long countAllByTypeNotInAndBlockIn(List<QuestionType> questionTypes, List<Block> blocks);
}
