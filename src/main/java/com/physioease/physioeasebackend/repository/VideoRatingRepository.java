package com.physioease.physioeasebackend.repository;

import com.physioease.physioeasebackend.model.VideoRating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VideoRatingRepository extends JpaRepository<VideoRating, Long> {
    List<VideoRating> findByUserId(Long userId);
    Optional<VideoRating> findByUserIdAndVideoId(Long userId, String videoId);
}