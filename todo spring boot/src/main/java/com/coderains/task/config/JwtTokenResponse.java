package com.coderains.task.config;

import com.coderains.task.user.UserApiResponse;

public record JwtTokenResponse<T>(String token, UserApiResponse user) {
}
