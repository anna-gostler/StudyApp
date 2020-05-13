package com.study.backend.repository;

import java.util.Date;
import java.util.List;

import com.study.backend.data.Vocab;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface VocabRepository extends MongoRepository<Vocab, String>, VocabRepositoryCustom {
    List<Vocab> findByEnglish(String english);// will be auto-implemented by Spring
    List<Vocab> findByDuedateBefore(Date duedate);    
    List<Vocab> findByAddeddate(Date addedDate);
}


// ref autoimplemented queries
// https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#reference
//https://blog.marcnuri.com/spring-data-mongodb-custom-repository-implementation/
