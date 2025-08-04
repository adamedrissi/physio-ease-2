package com.physioease.physioeasebackend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "consultations", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"patient_id", "week_start"})
})
public class Consultation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "patient_id")
    private User patient;

    @ManyToOne @JoinColumn(name = "physio_id")
    private User physio;

    private LocalDateTime slotStart;
    private LocalDateTime slotEnd;
    private LocalDate weekStart;
    private boolean isOnline;
}
