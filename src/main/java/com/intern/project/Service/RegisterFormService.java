package com.intern.project.Service;

import java.lang.StackWalker.Option;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intern.project.Entity.LoginForm;
import com.intern.project.Entity.RegisterForm;
import com.intern.project.Exception.AllException;
import com.intern.project.Repository.LoginFormRepository;
import com.intern.project.Repository.RegisterFormRepository;

@Service
public class RegisterFormService {
	@Autowired
	RegisterFormRepository registerFormRepository;
	@Autowired
	LoginFormRepository loginFormRepository;

	private String userId = generateOTP(5);

	public List<RegisterForm> getAllRegisterForm() {
		return registerFormRepository.findAll();
	}

	public RegisterForm addDetails(RegisterForm registerForm) {
		registerForm.setUserId(userId);
		RegisterForm reg = registerFormRepository.save(registerForm);
		LoginForm login = new LoginForm();
		login.setEmail(reg.getEmail());
		login.setPassword(registerForm.getPassword());
		login.setUserId(reg.getUserId());
		loginFormRepository.save(login);
		return registerFormRepository.save(registerForm);
	}

	public RegisterForm update(RegisterForm register, String email) {

		RegisterForm reg = registerFormRepository.findByEmail(email);
		reg.setAddress(register.getAddress());
		reg.setContactNo(register.getContactNo());
		reg.setEmail(register.getEmail());
		LoginForm login = loginFormRepository.findByEmail(email);

		login.setEmail(register.getEmail());
		loginFormRepository.save(login);

		return registerFormRepository.save(reg);
	}

	public RegisterForm getRegisterDetails(String email) {
		return registerFormRepository.findByEmail(email);
	}

	public RegisterForm findByEmail(String email) {
		return registerFormRepository.findByEmail(email);
	}

	public String generateOTP(int length) {

		String numbers = "0123456789";

		StringBuilder otp = new StringBuilder(length);

		Random random = new Random();
		for (int i = 0; i <= length; i++) {
			otp.append(numbers.charAt(random.nextInt(numbers.length())));
		}

		return otp.toString();
	}

	public boolean checkEmail(String email) {
		Optional<RegisterForm> register = Optional.of(registerFormRepository.findByEmail(email));
		if (register.isEmpty()) {
			return false;
		}

		return true;
	}

//	public RegisterForm update1(RegisterForm registerForm, String email) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//

}
