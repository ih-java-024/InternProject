package com.intern.project.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intern.project.Entity.PolicyDetails;
import com.intern.project.Repository.PolicyDetailsRepository;

@Service
public class PolicyDetailsService {

	@Autowired
	PolicyDetailsRepository policyDetailsRepository;

	public List<PolicyDetails> getPolicyDetails() {
		return policyDetailsRepository.findAll();
	}

	public PolicyDetails addPolicydetails(PolicyDetails policyDetails) {
		return policyDetailsRepository.save(policyDetails);
	}

}
