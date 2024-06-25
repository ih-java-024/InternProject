package com.intern.project.Entity;

import com.intern.project.Repository.RegisterFormRepository;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table
@Data
public class RegisterForm {
	@Column
	private String firstname;
	@Column
	private String dateofbirth;
	@Column
	private String gender;
	@Column
	private String contactNo;
	@Column
	private String address;
	@Id
	private String userId;
	@Column
	private String email;
	@Column
	private String password;
	@Column
	private String marital_status;

	public static RegisterForm get(int i) {
		RegisterForm reg = RegisterFormRepository.getFirstName();
		return reg;
	}

}
