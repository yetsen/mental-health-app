package com.mentalhealth.app.repository;

import com.mentalhealth.app.domain.Answer;
import com.mentalhealth.app.domain.Question;
import com.mentalhealth.app.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

    Optional<Answer> findByUserAndQuestionAndChoice_Value(User user, Question question, String choiceValue);

    Optional<Answer> findByUserAndQuestion(User user, Question question);

    void deleteAnswersByUserAndQuestion(User user, Question question);

    Optional<List<Answer>> findByUser(User user);

    Optional<List<Answer>> findByUser_IdAndQuestion_IdIn(Long userId, List<Long> questionIdList);

    void deleteAnswersByUser(User user);

    long countAnswersByUser(User user);
}
