package com.mentalhealth.app.repository;

import com.mentalhealth.app.domain.Answer;
import com.mentalhealth.app.domain.Question;
import com.mentalhealth.app.domain.SurveyInformation;
import com.mentalhealth.app.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

    Optional<Answer> findByQuestionAndChoice_ValueAndSurveyInformation(Question question, String choiceValue, SurveyInformation surveyInformation);

    Optional<Answer> findByQuestionAndSurveyInformation(Question question, SurveyInformation surveyInformation);

    Optional<List<Answer>> findBySurveyInformation(SurveyInformation surveyInformation);

    Optional<List<Answer>> findBySurveyInformationAndQuestion_IdIn(SurveyInformation surveyInformation, List<Long> questionIds);

    Optional<List<Answer>> findByQuestion_IdInAndSurveyInformation(List<Long> questionIdList, SurveyInformation surveyInformation);

    Optional<List<Answer>> findByQuestion_IdInAndSurveyInformation_Id(List<Long> questionIdList, Long surveyInformationId);

    List<Answer> findByQuestion_IdInAndSurveyInformationIn(List<Long> questionIdList, List<SurveyInformation> surveyInformations);

    void deleteAnswersBySurveyInformation_Id(Long surveyInformationId);

    long countAnswersBySurveyInformation(SurveyInformation surveyInformation);
}
