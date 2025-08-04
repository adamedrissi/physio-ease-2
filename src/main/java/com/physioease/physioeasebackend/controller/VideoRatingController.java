package com.physioease.physioeasebackend.controller;

import com.physioease.physioeasebackend.model.VideoRating;
import com.physioease.physioeasebackend.repository.VideoRatingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/video-ratings")
public class VideoRatingController {

    private final VideoRatingRepository ratingRepo;

    public VideoRatingController(VideoRatingRepository ratingRepo) {
        this.ratingRepo = ratingRepo;
    }

    @PostMapping
    public ResponseEntity<?> submitRating(@RequestBody VideoRating rating) {
        Optional<VideoRating> existing = ratingRepo.findByUserIdAndVideoId(rating.getUserId(), rating.getVideoId());

        if (existing.isPresent()) {
            VideoRating existingRating = existing.get();
            existingRating.setRating(rating.getRating());
            return ResponseEntity.ok(ratingRepo.save(existingRating));
        }

        return ResponseEntity.ok(ratingRepo.save(rating));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<VideoRating>> getUserRatings(@PathVariable Long userId) {
        return ResponseEntity.ok(ratingRepo.findByUserId(userId));
    }

    @GetMapping
    public ResponseEntity<List<VideoRating>> getAllRatings() {
        return ResponseEntity.ok(ratingRepo.findAll());
    }
}