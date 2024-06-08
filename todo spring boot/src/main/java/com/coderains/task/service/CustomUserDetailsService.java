package com.coderains.task.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.coderains.task.user.UserJPARepository;

import org.springframework.security.core.userdetails.User;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    private final UserJPARepository userRepository;

    public CustomUserDetailsService(UserJPARepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.coderains.task.user.User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("read"));

        return new User(user.getEmail(), user.getPassword(), authorities);
    }
}
/*
 * Could not create query for public abstract com.coderains.task.user.User
 * com.coderains.task.user.UserRepository.findbyEmail(java.lang.String); Reason:
 * Failed to create query for method public abstract
 * com.coderains.task.user.User
 * com.coderains.task.user.UserRepository.findbyEmail(java.lang.String); No
 * property 'findbyEmail' found for type 'User'
 * 
 */