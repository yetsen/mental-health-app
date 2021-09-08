package com.mentalhealth.app.repository;

import com.mentalhealth.app.domain.SurveyInformation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SurveyInformationRepository  extends JpaRepository<SurveyInformation, Long> {

	Optional<SurveyInformation> findByUser_IdAndTimes(Long userId, Integer times);

	List<SurveyInformation> findByUser_Id(Long userId);

	List<SurveyInformation> findByUser_IdOrderByTimesAsc(Long userId);

	List<SurveyInformation> findByUser_IdInOrderByTimesAsc(List<Long> userId);
}
