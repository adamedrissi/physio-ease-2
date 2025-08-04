package com.physioease.physioeasebackend.repository;

import com.physioease.physioeasebackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRoleAndCountry(String role, String country);
    @Query("""
    SELECT u FROM User u
    WHERE u.role = 'physio'
      AND u.country = :country
      AND (:speciality IS NULL OR u.speciality = :speciality)
      AND FUNCTION('earth_distance',
           ll_to_earth(:lat, :lon),
           ll_to_earth(u.latitude, u.longitude)) <= :radiusKm * 1000
      AND (SELECT COUNT(p) FROM PatientPhysio p WHERE p.physio = u) < 40
    """)
    List<User> findNearbyPhysios(
            @Param("lat") double lat,
            @Param("lon") double lon,
            @Param("radiusKm") double radiusKm,
            @Param("country") String country,
            @Param("speciality") String speciality
    );
}