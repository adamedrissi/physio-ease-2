package com.physioease.physioeasebackend.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ContactMessage {
    private String name;
    private String email;
    private String message;
}