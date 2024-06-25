package com.intern.project.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table
@Data
public class Quotation {
	@Id
	private String year;
	@Column
	private String selected;
	@Column
	private String intrest;
	@Column
	private String intrest1;
	@Column
	private String intrest2;
	@Column
	private String intrest3;
	@Column
	private String intrest4;

}
