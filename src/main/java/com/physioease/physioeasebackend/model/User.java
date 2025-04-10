package com.physioease.physioeasebackend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String role;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNumber;
    //@Column(length = 1000)
    private String profilePicture;
    private String sex;
    private LocalDate dateOfBirth;
    //patient
    private Integer height;
    private Integer weight;
    //physio
    private String speciality;
    private Integer yearsOfExperience;
    //patient
    private Boolean trackingPlanCompleted = false;
}