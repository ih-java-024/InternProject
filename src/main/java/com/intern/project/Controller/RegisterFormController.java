package com.intern.project.Controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.intern.project.Entity.RegisterForm;
import com.intern.project.Service.RegisterFormService;

@CrossOrigin(origins = "http://192.168.1.171:3000")
@RestController
@RequestMapping("register")
public class RegisterFormController {
	@Autowired
	RegisterFormService registerFormService;

	@GetMapping("/get")
	public List<RegisterForm> getAllRegisterForm() {
		return registerFormService.getAllRegisterForm();
	}

	@PostMapping("/add")
	public RegisterForm addDetails(@RequestBody RegisterForm registerForm) {
		return registerFormService.addDetails(registerForm);

	}

	@PostMapping("/checkemail/{email}")
	public boolean checkEmail(@PathVariable String email) {
		return registerFormService.checkEmail(email);

	}

	@GetMapping("/get/{email}")
	public RegisterForm getRegisterDetails(@PathVariable String email) {
		return registerFormService.getRegisterDetails(email);
	}

	@GetMapping("/sendOtp")
	public String sendOtp(@RequestParam String mobileno, @RequestParam String otp) {
		String url = "https://login4.spearuc.com/MOBILE_APPS_API/sms_api.php?type=smsquicksend&user=qtnextotp&pass=987654&sender=QTTINF"
				+ "&t_id=1707170494921610008&to_mobileno=" + mobileno + "&sms_text=" + "Dear customer, use this OTP "
				+ otp
				+ " to signup into your Quality Thought Next account. This OTP will be valid for the next 15 mins";

		RestTemplate restTemplate = new RestTemplate();
//        System.out.println(otp);
		return restTemplate.getForObject(url, String.class);
	}

	@PutMapping("/update/{email}")
	public RegisterForm updateRegisterDetails(@PathVariable String email, @RequestBody RegisterForm registerForm) {
		return registerFormService.update(registerForm, email);

	}

	@PostMapping("/sendEmail/{emailRequest}")
	public String sendEmail(@PathVariable String emailRequest) {
		String postUrl = "https://api.zeptomail.in/v1.1/email";
		StringBuffer sb = new StringBuffer();

		String otp = registerFormService.generateOTP(5);
		try {

			URL url1 = new URL(postUrl);
			HttpURLConnection conn = (HttpURLConnection) url1.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("Accept", "application/json");
			conn.setRequestProperty("Authorization",
					"Zoho-enczapikey PHtE6r0EFLjr3jMsp0QAt/+wE8TyN40tr+hmKFMVsIgUXqMFTk0Bqdl6wDPiqU8jXPJHR/ObzN5ttLOe5+ONdGrtZG1NXmqyqK3sx/VYSPOZsbq6x00etFUdcE3aUIbvetFq0ifQvdbcNA==");

			JSONObject requestBody = new JSONObject();
			JSONObject from = new JSONObject();
			String email = "support@qtnext.com";
			from.put("address", email);
			requestBody.put("from", from);

			JSONObject to = new JSONObject();
			JSONObject emailAddress = new JSONObject();
			emailAddress.put("address", emailRequest);
			// emailAddress.put("name", emailRequest.getToName());
			to.put("email_address", emailAddress);
			requestBody.put("to", new JSONObject[] { to });

			requestBody.put("subject", "Email updation for Rs Insurance");
			String greeting = "thanks & regards";
			String ofcName = "RS Insurance pvt ltd.";
			String address1 = "Madhapur, Hyderabad,";
			String address2 = "Telangana, India. 500081";

			requestBody.put("htmlbody",
					"Dear Custumer,Otp to update the email in Rs Insurance pvt ltd. Here is you 6 digits one time password: <h3> "
							+ otp + " " + "<h5>" + greeting + "<br/>" + ofcName + "<br/>" + address1 + "<br/>"
							+ address2 + "");

			OutputStream os = conn.getOutputStream();
			os.write(requestBody.toString().getBytes());
			os.flush();

			BufferedReader br;
			if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
				br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
			} else {
				br = new BufferedReader(new InputStreamReader((conn.getErrorStream())));
			}

			String output;
			while ((output = br.readLine()) != null) {
				sb.append(output);
			}

			br.close();
			conn.disconnect();

			return otp;
		} catch (Exception e) {
			e.printStackTrace();
			return otp;
		}
	}

}
