package com.intern.project.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.intern.project.Entity.LoginForm;
import com.intern.project.Service.LoginFormService;

@CrossOrigin(origins = "http://192.168.1.171:3000")
@RestController
@RequestMapping("/login")
public class LoginFormController {
	@Autowired
//	List <LoginForm> list=new ArrayList<>();
	LoginFormService loginFormService;

	@PostMapping("/add")
	public String addDetails(@RequestBody LoginForm loginForm) {
		Optional<LoginForm> log = Optional.ofNullable(loginFormService.findByEmail(loginForm.getEmail()));
		if (log.isPresent()) {
			LoginForm user = log.get();

			if (user.getPassword().equals(loginForm.getPassword())) {
				return "Login Successfully";
			}

			else {
				return "Invalid user";
			}
		}

		else

		{
			return "user not found";
		}
	}

	@GetMapping("/getAll")
	public List<LoginForm> getAll(@RequestBody LoginForm loginForm) {
		return loginFormService.getAll(loginForm);

	}

	@PutMapping("/update")
	public LoginForm update(@RequestBody LoginForm loginForm) {

		return loginFormService.saveOrUpdate(loginForm);

	}

	@DeleteMapping("/delete/{email}")
	public LoginForm delete(@RequestBody LoginForm loginForm)

	{
		return loginFormService.delete(loginForm);

	}

}
