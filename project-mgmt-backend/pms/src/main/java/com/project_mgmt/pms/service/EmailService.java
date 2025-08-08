package com.project_mgmt.pms.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.time.LocalTime;

@Service
public class EmailService {

    private static final String FROM_EMAIL = "noreply@keells.com";
    private static final String OTP_SUBJECT = "Your Password Reset OTP";
    private static final String MEETING_INVITATION_SUBJECT = "Meeting Invitation: %s";

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(FROM_EMAIL);
        message.setTo(toEmail);
        message.setSubject(OTP_SUBJECT);
        message.setText(createOtpEmailContent(otp));
        mailSender.send(message);
    }

    public void sendMeetingInvitation(String toEmail, String meetingDescription,
                                      Date meetingDate, LocalTime meetingTime, String venue) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(FROM_EMAIL);
        message.setTo(toEmail);
        message.setSubject(String.format(MEETING_INVITATION_SUBJECT, meetingDescription));
        message.setText(createMeetingInvitationContent(meetingDescription, meetingDate, meetingTime, venue));
        mailSender.send(message);
    }

    private String createOtpEmailContent(String otp) {
        return String.format(
                "Your OTP for password reset is: %s\n\n" +
                        "This OTP is valid for 5 minutes.\n\n" +
                        "If you didn't request this OTP, please ignore this email or contact support.",
                otp
        );
    }

    private String createMeetingInvitationContent(String description, Date date, LocalTime time, String venue) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("EEEE, MMMM d, yyyy");
        return String.format(
                "You have been invited to a meeting:\n\n" +
                        "Meeting Title: %s\n" +
                        "Date: %s\n" +
                        "Time: %s\n" +
                        "Venue: %s\n\n" +
                        "Please make sure to attend on time.\n\n" +
                        "This is an automated notification from Keells PMS.",
                description,
                dateFormat.format(date),
                time.toString(),
                venue
        );
    }
}