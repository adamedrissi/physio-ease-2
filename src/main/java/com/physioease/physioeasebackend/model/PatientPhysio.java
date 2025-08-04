package com.physioease.physioeasebackend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "physio_patient_link")
public class PatientPhysio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private User patient;

    @ManyToOne
    @JoinColumn(name = "physio_id")
    private User physio;

    private LocalDate assignedOn;
}
