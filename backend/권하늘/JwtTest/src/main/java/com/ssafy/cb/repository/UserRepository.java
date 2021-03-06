package com.ssafy.cb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.cb.dto.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	User findByUsername(String username);
}
