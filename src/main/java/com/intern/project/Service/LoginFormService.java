package com.intern.project.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intern.project.Entity.LoginForm;
import com.intern.project.Repository.LoginFormRepository;

@Service
public class LoginFormService {
	@Autowired
	LoginFormRepository loginFormRepository;

//	public LoginForm addDetails(LoginForm loginForm) {
//		return loginFormRepository.save(loginForm);
//	}

	public List<LoginForm> getAll(LoginForm loginForm) {
		return loginFormRepository.findAll();
	}

	public LoginForm saveOrUpdate(LoginForm loginForm) {
		LoginForm log = loginFormRepository.findById(loginForm.getEmail()).get();
		log.setPassword(loginForm.getPassword());
		return loginFormRepository.save(log);
	}

	public LoginForm delete(LoginForm loginForm) {
		loginFormRepository.deleteById(loginForm.getEmail());
		return loginForm;
	}

	public LoginForm findByEmail(String email) {
		return loginFormRepository.findByEmail(email);
	}

}
