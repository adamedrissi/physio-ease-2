package com.physioease.physioeasebackend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "feedback")
@Data
@NoArgsConstructor
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Store user information directly
    private String firstName;
    private String lastName;

    // Feedback responses (as numbers)
    private Integer question1;
    private Integer question2;

    @Column(columnDefinition = "TEXT")
    private String specificFeedback;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime submittedAt = LocalDateTime.now();
}