package com.coderains.task.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserJPARepository extends JpaRepository<User, String> {
    User findByEmail(String email);
}
