package com.intern.project.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table
@Data
public class Payment {

	@Id
	private String paymentId;
	@Column
	private String planType;
	@Column
	private String relations;
	@Column
	private String duration;
	@Column
	private String insurancecover;
	@Column
	private String intrestplan;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "userId", referencedColumnName = "userId")
	private RegisterForm registerForm;

}
