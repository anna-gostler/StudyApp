package com.study.backend.data;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "vocabs") //added
public class Vocab {
    @Id
    private String id;
    private String kanji;
    private String kana;
    private String type;
    private String english;
    private String note;
    private Date duedate;
    private Date addeddate;
    private int progress;

    public Vocab(
        String kanji, 
        String kana,
        String type,
        String english,
        String note,
        Date duedate,
        Date addeddate,
        int progress
        ){
        this.kanji = kanji;
        this.kana = kana;
        this.type = type;
        this.english = english;
        this.note = note;
        this.duedate = duedate;
        this.addeddate = addeddate;
        this.progress = progress;
    }

    public String getId() {
        return id;
    }

    public String getKana() {
        return kana;
    }

    public String getKanji() {
        return kanji;
    }

    public String getEnglish() {
        return english;
    }

    public String getNote() {
        return note;
    }

    public String getType() {
        return type;
    }

    public Date getDueDate() {
        return duedate;
    }

    public Date getAddDate() {
        return addeddate;
    }

    public int getProgress() {
        return progress;
    }

    public String setEnglish(String str){
        this.english = str;
        return this.english;
    }

    public String toString(){
        return this.id + " " + 
        this.kana + " " + 
        this.kanji + " " + 
        this.english + " added on: " + 
        this.addeddate + " due: " + 
        this.duedate;
    }
}