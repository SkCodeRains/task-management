package com.coderains.task.user.task;

import java.util.Date;

import com.coderains.task.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tasks") // Optional: Specify table name
public class Task {

    @Id // Assuming auto-incrementing ID
    private String _id;

    @ManyToOne(fetch = FetchType.LAZY) // Many tasks belong to one user (lazy fetching)
    @JoinColumn(name = "user_id", nullable = false) // Foreign key to user table
    @JsonIgnore
    private User user;

    @Column(nullable = false)
    private String task_name;

    private Integer status; // Consider an enum for different task statuses

    private String description;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date startDate;

    private Date endDate;

    // Getters, setters, constructors (optional)

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getTask_name() {
        return task_name;
    }

    public void setTask_name(String taskName) {
        this.task_name = taskName;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    @Override
    public String toString() {
        return "Task [_id=" + _id + ", user=" + user + ", task_name=" + task_name + ", status=" + status
                + ", description=" + description + ", startDate=" + startDate + ", endDate=" + endDate + "]";
    }

    // ... other getters and setters

}
