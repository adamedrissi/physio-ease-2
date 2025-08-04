package com.physioease.physioeasebackend.dto;

import com.physioease.physioeasebackend.model.User;

import java.time.LocalDateTime;

public class ConsultationRequest {
    private Long patientId;
    private Long physioId;
    private LocalDateTime slotStart;
    private boolean online;
}
