package com.coderains.task.user;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * userAlreadyExists
 * String message
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record UserAlreadyExists(String message) {
}