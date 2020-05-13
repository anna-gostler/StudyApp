package com.study.backend.repository;

import java.util.Date;

public class DynamicQuery {
    private Date dueDateFilter;  
    private Date addedDateFilter;  
    private String englishFilter;  

    public void setDueDateFilter(Date filter){
        this.dueDateFilter = filter;
    }

    public Date getDueDateFilter(){
        return dueDateFilter;
    }

    public void setAddedDateFilter(Date filter){
        this.addedDateFilter = filter;
    }

    public Date getAddedDateFilter(){
        return addedDateFilter;
    }

    public void setEnglishFilter(String filter){
        this.englishFilter = filter;
    }

    public String getEnglishFilter(){
        return englishFilter;
    }
}