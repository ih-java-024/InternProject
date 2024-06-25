package com.intern.project.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intern.project.Entity.Payment;
import com.intern.project.Entity.RegisterForm;
import com.intern.project.Repository.PaymentRepository;

@Service
public class PaymentService {
	@Autowired
	PaymentRepository paymentRepository;

	public List<Payment> getPayment() {
		return paymentRepository.findAll();
	}

	public Payment addCustomer(Payment payment, RegisterForm register) {
		payment.setRegisterForm(register);
		return paymentRepository.save(payment);
	}

	public List<Payment> getByMail(String email) {
		return paymentRepository.findByRegisterForm_Email(email);
	}
}
