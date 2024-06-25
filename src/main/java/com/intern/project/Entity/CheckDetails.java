package com.intern.project.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table
@Data
public class CheckDetails {
	@Column
	private String values;
	@Id
	private String policyType;
	@Column
	private String hubq;
	@Column
	private String hubq1;
	@Column
	private String family;
	@Column
	private String selected;
	@Column
	private String money;
	@Column
	private String amount1;
	@Column
	private String amount2;
	@Column
	private String amount3;
	@Column
	private String amount4;
	@Column
	private String amount5;
	@Column
	private String x;

}
