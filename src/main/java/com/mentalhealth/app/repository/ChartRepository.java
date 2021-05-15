package com.mentalhealth.app.repository;

import com.mentalhealth.app.domain.Chart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChartRepository extends JpaRepository<Chart, Long> {

}
