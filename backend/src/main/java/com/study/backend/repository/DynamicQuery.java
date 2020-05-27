package com.study.backend.repository;

import java.util.Date;

public class DynamicQuery {
    private Date dueDateFilter;  
    private Date addedDateFilter;  
    private String englishFilter;  
    private String allFilter;
    private String seenFilter;


    public void setDueDateFilter(Date filter){
        this.dueDateFilter = filter;
    }

    public void setSeenFilter(String filter){
        this.seenFilter = filter;
    }

    public String getSeenFilter(){
        return seenFilter;
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

    public void setAllFilter(String filter){
        this.allFilter = filter;
    }

    public String getEnglishFilter(){
        return englishFilter;
    }
    
    public String getAllFilter(){
        return allFilter;
    }
}