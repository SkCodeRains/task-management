package com.coderains.task.user;

import java.io.IOException;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.Date;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
 
import org.springframework.web.bind.annotation.GetMapping;
 
@RestController
@AllArgsConstructor
public class UserJpaResource {
    private UserService userService;

    @PostMapping("/signup.ss")
    private Object registerUser(@RequestBody User user) {
        return userService.signUpUser(user);

    }

    @GetMapping("/test.ss")
    public String getMethodName() {
        return new String("Hello Dear");
    }

    @PostMapping(value = "/updateProfile.ss", consumes = MediaType.ALL_VALUE)
    public Object updateUserDetails(
            @RequestParam(required = false) MultipartFile picture,
            @RequestParam("username") String username,
            @RequestParam(value = "dob", required = false) String dobString,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String address,
            @RequestHeader("Authorization") String token)
            throws IOException {

        User user = new User();
        user.setUsername(username);

        if (dobString != null && !dobString.isEmpty()) {
            DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
            ZonedDateTime zonedDateTime = ZonedDateTime.parse(dobString, formatter);
            Date dob = Date.from(zonedDateTime.toInstant());
            user.setDob(dob);
        }

        user.setGender(gender);
        user.setAddress(address);
        if (picture != null) {
            byte[] fileBytes = picture.getBytes();
            String contentType = picture.getContentType();
            String imageString = Base64.getEncoder().encodeToString(fileBytes);
            // data:${ret.profilePicture.contentType};base64,
            user.setProfilePictureData("data:" + contentType + ";base64," + imageString);
            user.setProfilePictureContentType(contentType);
        }
        return userService.updateUser(user, token);
    }

}
