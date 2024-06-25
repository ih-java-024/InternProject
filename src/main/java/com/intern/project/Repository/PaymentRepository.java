package com.intern.project.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.intern.project.Entity.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, String> {

//	List<Payment> findByUserId(String String);

//	List<Payment> findByEmail(String email);

	List<Payment> findByRegisterForm_Email(String email);


	List<Payment> findByPaymentId(String paymentId);


}
