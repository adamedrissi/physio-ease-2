package com.physioease.physioeasebackend.controller;

import com.physioease.physioeasebackend.model.Feedback;
import com.physioease.physioeasebackend.repository.FeedbackRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackRepository feedbackRepository;

    public FeedbackController(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    @PostMapping
    public ResponseEntity<?> submitFeedback(@RequestBody Feedback feedback) {
        try {
            Feedback savedFeedback = feedbackRepository.save(feedback);
            return ResponseEntity.ok(savedFeedback);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error saving feedback: " + e.getMessage());
        }
    }
}