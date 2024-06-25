package com.intern.project.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table
@Data
public class PolicyDetails {
	@Id
	private String policyType;
	@Column
	private String familyMembers;
	@Column
	private String hub;
	@Column
	private String date;
	@Column
	private String date1;
	@Column
	private String hub1;
	@Column
	private String counter;
	@Column
	private String counter1;

}
