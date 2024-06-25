package com.intern.project.Controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.intern.project.Entity.Payment;
import com.intern.project.Entity.RegisterForm;
import com.intern.project.Service.InvoiceService;
import com.intern.project.Service.PaymentService;
import com.intern.project.Service.RegisterFormService;
import com.lowagie.text.DocumentException;

import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin(origins = "http://192.168.1.171:3000")
@RestController
@RequestMapping("/payment")
public class PaymentController {

	@Autowired
	private PaymentService paymentService;

	@Autowired
	private RegisterFormService registerFormService;

	@Autowired
	private InvoiceService invoiceService;

	@GetMapping("/getpay")
	public List<Payment> getPaymentDetails() {
		return paymentService.getPayment();
	}

	@GetMapping("/getpaybyemail/{email}")
	public ResponseEntity<List<Payment>> getPaymentsByEmail(@PathVariable String email) {
		List<Payment> payments = paymentService.getByMail(email);
		if (payments.isEmpty()) {
			return null;
		}
		return ResponseEntity.ok(payments);
	}

	@PostMapping("/addpay/userId/{email}")
	public ResponseEntity<?> addCustomer(@RequestBody Payment payment, @PathVariable(name = "email") String email) {
		RegisterForm register = registerFormService.findByEmail(email);
		if (register == null) {
			return ResponseEntity.badRequest().body("User with email " + email + " not found");
		}
		System.out.println("User found: " + register);
		Payment createdPayment = paymentService.addCustomer(payment, register);
		return ResponseEntity.ok(createdPayment);
	}

	@GetMapping("/create/{paymentId}")
    public void createPdf(@PathVariable("paymentId") String paymentId, HttpServletResponse response) {
        // Setting content type and response headers
        response.setContentType("application/pdf");
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=document.pdf");

        // Initialize the invoice service with the provided userId
        invoiceService.init(paymentId);

        try {
            invoiceService.export(response);
        } catch (DocumentException | IOException e) {
            e.printStackTrace();
        }
    }

}
