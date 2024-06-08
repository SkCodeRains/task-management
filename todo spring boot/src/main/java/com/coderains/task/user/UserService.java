package com.coderains.task.user;

import java.util.Map;

import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.coderains.task.config.JwtTokenRequest;
import com.coderains.task.config.JwtTokenResponse;
import com.coderains.task.utility.Utilities;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaUpdate;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Data;

@Service
@AllArgsConstructor
public class UserService {

    private UserJPARepository jpaRepository;
    private RestTemplate restTemplate;
    private PasswordEncoder passwordEncoder;
    private Environment env;
    private final JwtDecoder jwtDecoder;
    private EntityManager entityManager;

    @SuppressWarnings("rawtypes")
    public ResponseEntity signUpUser(User user) {
        User foundUser = jpaRepository.findByEmail(user.getEmail());
        if (foundUser == null) {
            String password = user.getPassword();
            user.setPassword(passwordEncoder.encode(password));
            user.setUser_id(Utilities.generateUniqueId());
            jpaRepository.save(user);
            String serverPort = env.getProperty("server.port");
            String loginUrl = "http://localhost:" + serverPort + "/signin.ss";
            JwtTokenRequest loginRequest = new JwtTokenRequest(user.getEmail(), password);
            HttpEntity<JwtTokenRequest> requestEntity = new HttpEntity<JwtTokenRequest>(loginRequest);
            return restTemplate.postForEntity(loginUrl, requestEntity, JwtTokenResponse.class);
        } else {

            @Data
            @AllArgsConstructor
            class ApiResponse {
                private boolean status;
                private String message;
            }
            ApiResponse respones = new ApiResponse(false, "User Already Exists");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(respones);
        }
    }

    @SuppressWarnings("rawtypes")
    @Transactional
    public ResponseEntity updateUser(User userDetails, String token) {
        if (token.startsWith("bearer ")) {
            token = token.substring(7);
        }

        Map<String, Object> claims = jwtDecoder.decode(token).getClaims();
        String userId = (String) claims.get("userid");
        String email = (String) claims.get("email");
        userDetails.setUser_id(userId);

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaUpdate<User> update = cb.createCriteriaUpdate(User.class);
        Root<User> root = update.from(User.class);

        if (userDetails.getUsername() != null) {
            update.set(root.get("username"), userDetails.getUsername());
        }
        if (userDetails.getDob() != null) {
            update.set(root.get("dob"), userDetails.getDob());
        }
        if (userDetails.getProfilePictureData() != null && userDetails.getProfilePictureContentType() != null) {
            update.set(root.get("profilePictureData"), userDetails.getProfilePictureData());
            update.set(root.get("profilePictureContentType"), userDetails.getProfilePictureContentType());
        }
        if (userDetails.getGender() != null) {
            update.set(root.get("gender"), userDetails.getGender());
        }

        update.set(root.get("address"), userDetails.getAddress());

        update.where(cb.equal(root.get("user_id"), userId));
        int val = entityManager.createQuery(update).executeUpdate();

        if (val > 0) {
            userDetails = jpaRepository.findByEmail(email);
        }

        ProfilePicture picture = null;
        if (userDetails.getProfilePictureContentType() != null) {
            picture = new ProfilePicture(userDetails.getProfilePictureContentType(),
                    userDetails.getProfilePictureData());
        }

        @Data
        @AllArgsConstructor
        class ApiResponse {
            private boolean success;
            private UserApiResponse user;
        }
        ApiResponse apiResponse = new ApiResponse(true,
                (new UserApiResponse(userDetails.getUsername(), userDetails.getEmail(), picture, userDetails.getDob(),
                        userDetails.getGender(),
                        userDetails.getAddress())));
        return ResponseEntity.ok().body(apiResponse);
    }

}
