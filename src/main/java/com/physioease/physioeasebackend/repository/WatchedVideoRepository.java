package com.physioease.physioeasebackend.repository;

import com.physioease.physioeasebackend.model.WatchedVideo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WatchedVideoRepository extends JpaRepository<WatchedVideo, Long> {
    List<WatchedVideo> findByUserId(Long userId);
    boolean existsByUserIdAndVideoId(Long userId, String videoId);
}