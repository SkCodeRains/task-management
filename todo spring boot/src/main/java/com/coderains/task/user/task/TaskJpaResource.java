package com.coderains.task.user.task;
 
import org.springframework.web.bind.annotation.RestController;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController 
@AllArgsConstructor
public class TaskJpaResource {

    TaskJPARepository repository;
    TaskService taskService;

    @GetMapping("/getTasks.ss")
    public Object getMethodName(@RequestHeader("Authorization") String token) {
        return taskService.getAllTasks(token);
    }

    @Transactional
    @PostMapping("/createTask.ss")
    public Object createTask(@RequestBody Task task, @RequestHeader("Authorization") String token) {
        return taskService.createTask(task, token);
    }

    @Transactional
    @PostMapping("/updateTask.ss")
    public Object updateTask(@RequestBody Task task, @RequestHeader("Authorization") String token) {
        return taskService.createTask(task, token);
    }

    @Transactional
    @PostMapping("/deleteTask.ss")
    public Object deleteTask(@RequestBody Task task) {
        return taskService.deleteTask(task);
    }

}
