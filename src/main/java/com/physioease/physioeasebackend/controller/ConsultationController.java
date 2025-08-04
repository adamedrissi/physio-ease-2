package com.physioease.physioeasebackend.controller;

import com.physioease.physioeasebackend.model.Consultation;
import com.physioease.physioeasebackend.model.User;
import com.physioease.physioeasebackend.repository.UserRepository;
import com.physioease.physioeasebackend.repository.ConsultationRepository;
import com.physioease.physioeasebackend.dto.ConsultationRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultations")
public class ConsultationController {

    @Autowired
    private ConsultationRepository consultationRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/book")
    public ResponseEntity<?> bookConsultation(@RequestBody ConsultationRequest request) {
        // validation & saving logic here
        return null;
    }

    @GetMapping("/physio/{id}")
    public ResponseEntity<?> getConsultationsForPhysio(@PathVariable Long id) {
        return ResponseEntity.ok(consultationRepository.findByPhysioId(id));
    }

    @GetMapping("/search-physios")
    public ResponseEntity<List<User>> searchNearbyPhysios(
            @RequestParam double lat,
            @RequestParam double lon,
            @RequestParam double radiusKm,
            @RequestParam String country,
            @RequestParam(required = false) String speciality
    ) {
        List<User> matches = userRepository.findNearbyPhysios(lat, lon, radiusKm, country, speciality);
        return ResponseEntity.ok(matches);
    }
}