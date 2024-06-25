package com.intern.project.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "loginPage")
@Data
public class LoginForm {
	@Id
	private String userId;
	@Column
	private String email;
	@Column
	private String password;
}