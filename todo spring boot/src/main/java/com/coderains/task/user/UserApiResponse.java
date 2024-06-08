package com.coderains.task.user;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UserApiResponse(String username, String email, ProfilePicture profilePicture, Date dob, String gender,
        String address) {

}
