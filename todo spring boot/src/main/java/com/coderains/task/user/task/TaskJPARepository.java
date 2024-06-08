package com.coderains.task.user.task;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coderains.task.user.User;

public interface TaskJPARepository extends JpaRepository<Task, String> {
    List<Task> findByUser(User user);
}
