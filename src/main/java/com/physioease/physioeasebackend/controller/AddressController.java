package com.physioease.physioeasebackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/address")
public class AddressController {

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/search")
    public ResponseEntity<?> searchAddress(
            @RequestParam("q") String query,
            @RequestParam(value = "countryCode", required = false) String countryCode
    ) {
        try {
            String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);
            String url = "https://nominatim.openstreetmap.org/search?q=" + encodedQuery +
                    "&format=json&addressdetails=1&limit=5";

            if (countryCode != null && !countryCode.isEmpty()) {
                url += "&countrycodes=" + countryCode.toLowerCase();
            }

            Object response = restTemplate.getForObject(url, Object.class);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Address lookup failed: " + e.getMessage());
        }
    }
}