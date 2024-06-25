package com.intern.project.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.intern.project.Entity.LoginForm;

@Repository
public interface LoginFormRepository extends JpaRepository<LoginForm, String> {

	LoginForm save(String email);

	LoginForm findByEmail(String currentEmail);

}
