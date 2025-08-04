package com.physioease.physioeasebackend.controller;

import com.physioease.physioeasebackend.model.ContactMessage;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String recipientEmail;

    public ContactController(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @PostMapping
    public ResponseEntity<String> sendMessage(@RequestBody ContactMessage contact) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(recipientEmail);
            helper.setSubject("New Contact Message from " + contact.getName());
            helper.setText(
                    "Name: " + contact.getName() + "\n" +
                            "Email: " + contact.getEmail() + "\n\n" +
                            "Message:\n" + contact.getMessage()
            );
            mailSender.send(message);
            return ResponseEntity.ok("Message sent successfully");
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body("Failed to send message: " + e.getMessage());
        }
    }
}