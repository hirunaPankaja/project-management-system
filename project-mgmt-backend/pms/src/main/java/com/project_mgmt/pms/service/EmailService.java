package com.project_mgmt.pms.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@keells.com");
        message.setTo(toEmail);
        message.setSubject("Your Password Reset OTP");
        message.setText("Your OTP for password reset is: " + otp + "\n\nThis OTP is valid for 5 minutes.");

        mailSender.send(message);
    }
}