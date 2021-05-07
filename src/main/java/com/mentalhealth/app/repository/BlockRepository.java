package com.mentalhealth.app.repository;

import com.mentalhealth.app.domain.Block;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlockRepository  extends JpaRepository<Block, Long> {

    @Override List<Block> findAll ();
}
