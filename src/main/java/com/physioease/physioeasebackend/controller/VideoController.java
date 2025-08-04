package com.physioease.physioeasebackend.controller;

import com.physioease.physioeasebackend.model.Video;
import com.physioease.physioeasebackend.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    @Autowired
    private VideoRepository videoRepository;

    @GetMapping
    public ResponseEntity<List<Video>> getAllVideos() {
        return ResponseEntity.ok(videoRepository.findAll());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Video>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(videoRepository.findByCategory(category));
    }

    @PostMapping
    public ResponseEntity<Video> addVideo(@RequestBody Video video) {
        return ResponseEntity.ok(videoRepository.save(video));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVideo(@PathVariable Long id) {
        if (!videoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        videoRepository.deleteById(id);
        return ResponseEntity.ok("Video deleted.");
    }
}