package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Table;
import java.util.Date;

@Table(name= "web_users")
public class User {
    @Column(name="id")
    private Integer id;
    @Column(name="username")
    private String account;
    @Column(name="password")
    private String password;
    @Column(name="email")
    private String email;
    @Column(name="status")
    private String status;
    @Column(name="registration_time")
    private Date createdAt;
    @Column(name="last_login")
    private Date lastLogin;
    @Column(name="avatar")
    private String avatar;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(Date lastLogin) {
        this.lastLogin = lastLogin;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public User() {
    }

    public User(Integer id, String account, String password, String email, String status, Date createdAt, Date lastLogin, String avatar) {
        this.id = id;
        this.account = account;
        this.password = password;
        this.email = email;
        this.status = status;
        this.createdAt = createdAt;
        this.lastLogin = lastLogin;
        this.avatar = avatar;
    }
}
