package com.coderains.task.user;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import com.coderains.task.user.task.Task;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity(name = "user_details")
public class User {

    @Id
    @Column(unique = true, length = 15)
    private String user_id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password; // Store securely using a password hashing mechanism

    @OneToMany(mappedBy = "user") // One-to-Many with tasks
    private List<Task> tasks = new ArrayList<>();

    @Column(columnDefinition = "TEXT") // Large Object for potentially large image data
    private String profilePictureData;

    @Column(length = 255)
    private String profilePictureContentType;

    private Date dob;

    private String gender;

    private String address;

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password; // Hash password before storing
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public String getProfilePictureData() {
        return profilePictureData;
    }

    public void setProfilePictureData(String profilePictureData) {
        this.profilePictureData = profilePictureData;
    }

    public String getProfilePictureContentType() {
        return profilePictureContentType;
    }

    public void setProfilePictureContentType(String profilePictureContentType) {
        this.profilePictureContentType = profilePictureContentType;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

}