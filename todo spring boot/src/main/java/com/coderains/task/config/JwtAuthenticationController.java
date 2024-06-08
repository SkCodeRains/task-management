package com.coderains.task.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.coderains.task.user.ProfilePicture;
import com.coderains.task.user.User;
import com.coderains.task.user.UserApiResponse;
import com.coderains.task.user.UserJPARepository;

import lombok.AllArgsConstructor;
import lombok.Data;

@RestController
public class JwtAuthenticationController {

    private final JwtTokenService tokenService;
    private final UserJPARepository userRepository;
    private PasswordEncoder passwordEncoder;

    public JwtAuthenticationController(JwtTokenService tokenService,
            UserJPARepository userRepository, PasswordEncoder passwordEncoder) {
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @SuppressWarnings("rawtypes")
    @PostMapping("/signin.ss")
    public ResponseEntity<Object> generateToken(@RequestBody JwtTokenRequest jwtTokenRequest) {
        User user = userRepository.findByEmail(jwtTokenRequest.email());
        if (user == null) {
            @Data
            @AllArgsConstructor
            class ApiResponse {
                private boolean status;
                private String message;
            }
            ApiResponse respones = new ApiResponse(false, "User Not Exists");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(respones);
        }

        // Validate password
        if (!passwordEncoder.matches(jwtTokenRequest.password(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        // Generate token
        String token = tokenService.generateToken(user);

        ProfilePicture profilePicture = null;
        if (user.getProfilePictureContentType() != null && user.getProfilePictureContentType().length() > 0) {
            profilePicture = new ProfilePicture(user.getProfilePictureContentType(), user.getProfilePictureData());
        }

        UserApiResponse userResponse = new UserApiResponse(user.getUsername(), user.getEmail(), profilePicture,
                user.getDob(),
                user.getGender(),
                user.getAddress());

        return ResponseEntity.ok(new JwtTokenResponse("bearer " + token, userResponse));
    }
}
