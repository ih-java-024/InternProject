package com.intern.project.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.intern.project.Entity.PolicyDetails;

@Repository
public interface PolicyDetailsRepository extends JpaRepository<PolicyDetails, String> {

}
