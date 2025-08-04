package com.physioease.physioeasebackend.repository;

import com.physioease.physioeasebackend.model.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.time.LocalDateTime;

public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
    List<Consultation> findByPhysioId(Long physioId);
    List<Consultation> findByPatientId(Long patientId);
    boolean existsByPatientIdAndSlotStartBetween(Long patientId, LocalDateTime start, LocalDateTime end);
}