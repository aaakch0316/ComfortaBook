package com.ssafy.cb.auth;

import java.util.Arrays;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.cb.dto.User;
import com.ssafy.cb.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class DbInit implements CommandLineRunner {
	
    private final UserRepository userRepository;
    
    private final PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Delete all
        this.userRepository.deleteAll();
        // create users
        User minho = new User("minho", passwordEncoder.encode("minho123"),"USER","");
        User admin = new User("admin", passwordEncoder.encode("admin123"),"ADMIN","ACCESS_TEST1,ACCESS_TEST2");
        User manager = new User("manager", passwordEncoder.encode("manager123"),"MANAGER","ACCESS_TEST1");
        List<User> users = Arrays.asList(minho, admin, manager);
        // save to db
        this.userRepository.saveAll(users);
    }
}
