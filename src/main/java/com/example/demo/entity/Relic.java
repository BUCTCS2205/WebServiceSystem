package com.example.demo.entity;

import javax.persistence.*;

@Table(name="met_clear")
public class Relic {
    @Column(name = "id")
    private Integer id;
    @Column(name = "title")
    private String title;
    @Column(name = "artist")
    private String artist;
    @Column(name = "background")
    private String background;
    @Column(name = "age")
    private String age;
    @Column(name = "material")
    private String material;
    @Column(name = "size")
    private String size;
    @Column(name = "classify")
    private String classify;
    @Column(name = "description")
    private String description;
    @Column(name = "url")
    private String url;
    @Column(name = "link")
    private String link;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getBackground() {
        return background;
    }

    public void setBackground(String background) {
        this.background = background;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getClassify() {
        return classify;
    }

    public void setClassify(String classify) {
        this.classify = classify;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Relic() {
    }

    public Relic(Integer id, String title, String artist, String background, String age, String material, String size, String classify, String description, String url, String link) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.background = background;
        this.age = age;
        this.material = material;
        this.size = size;
        this.classify = classify;
        this.description = description;
        this.url = url;
        this.link = link;
    }
}
