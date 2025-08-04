package com.physioease.physioeasebackend.controller;

import com.physioease.physioeasebackend.model.WatchedVideo;
import com.physioease.physioeasebackend.repository.WatchedVideoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/watched-videos")
public class WatchedVideoController {

    private final WatchedVideoRepository watchedRepo;

    public WatchedVideoController(WatchedVideoRepository watchedRepo) {
        this.watchedRepo = watchedRepo;
    }

    @PostMapping
    public ResponseEntity<?> markWatched(@RequestBody WatchedVideo data) {
        if (!watchedRepo.existsByUserIdAndVideoId(data.getUserId(), data.getVideoId())) {
            data.setWatchedAt(LocalDateTime.now());
            watchedRepo.save(data);
        }
        return ResponseEntity.ok("Marked as watched");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<WatchedVideo>> getWatched(@PathVariable Long userId) {
        return ResponseEntity.ok(watchedRepo.findByUserId(userId));
    }
}