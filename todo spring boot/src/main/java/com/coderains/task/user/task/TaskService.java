package com.coderains.task.user.task;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;

import com.coderains.task.user.User;
import com.coderains.task.user.UserJPARepository;
import com.coderains.task.utility.Utilities;

import lombok.AllArgsConstructor;
import lombok.Data;

@Service
@AllArgsConstructor
public class TaskService {

    private final JwtDecoder jwtDecoder;
    private UserJPARepository userRepo;
    private TaskJPARepository taskRepo;

    public ResponseEntity createTask(Task task, String token) {
        if (token.startsWith("bearer ")) {
            token = token.substring(7);
        }

        Map<String, Object> claims = jwtDecoder.decode(token).getClaims();
        String email = (String) claims.get("email");

        User user = userRepo.findByEmail(email);
        task.setUser(user);
        if (task.get_id().length() == 0)
            task.set_id(Utilities.generateUniqueId());
        Task Savedtask = taskRepo.save(task);

        @Data
        @AllArgsConstructor
        class ApiResponse {
            private boolean success;
            private Task task;
        }

        ApiResponse respones = new ApiResponse(true, Savedtask);

        return ResponseEntity.ok().body(respones);

    }

    public Object getAllTasks(String token) {
        if (token.startsWith("bearer ")) {
            token = token.substring(7);
        }

        Map<String, Object> claims = jwtDecoder.decode(token).getClaims();
        String userid = (String) claims.get("userid");

        List<Task> tasks = userRepo.findById(userid).get().getTasks();

        @Data
        @AllArgsConstructor
        class ApiResponse {
            private boolean success;
            private List<Task> tasks;
        }

        ApiResponse respones = new ApiResponse(true, tasks);

        return ResponseEntity.ok().body(respones);
    }

    public ResponseEntity deleteTask(Task task) {
        taskRepo.deleteById(task.get_id());
        @Data
        @AllArgsConstructor
        class ApiResponse {
            private boolean success;
        }
        ApiResponse response = new ApiResponse(true);
        return ResponseEntity.ok().body(response);
    }

}
