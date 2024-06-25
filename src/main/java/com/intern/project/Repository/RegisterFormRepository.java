package com.intern.project.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.intern.project.Entity.RegisterForm;

public interface RegisterFormRepository extends JpaRepository<RegisterForm, String> {

	RegisterForm findByEmail(String email);

	boolean existsByEmail(String email);

	RegisterForm save(Optional<RegisterForm> reg);

	List<RegisterForm> findByUserId(String string);

	static RegisterForm getFirstName() {
		return getFirstName();
	}

//	RegisterForm saveAllAndFlush(String email);

}
