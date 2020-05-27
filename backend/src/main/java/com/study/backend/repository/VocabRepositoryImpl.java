package com.study.backend.repository;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import com.study.backend.data.Vocab;
import com.study.backend.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

public class VocabRepositoryImpl implements VocabRepositoryCustom {
	private final MongoTemplate mongoTemplate;
	Logger logger = new Logger();


    @Autowired
    public VocabRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
	public List<Vocab> query(DynamicQuery dynamicQuery) {
		final Query query = new Query();
		final List<Criteria> criteria = new ArrayList<>();
		if(dynamicQuery.getEnglishFilter() != null) {
			criteria.add(
                Criteria  
				.where("english")
				.regex(dynamicQuery.getEnglishFilter())
			);
		}

		if(dynamicQuery.getDueDateFilter() != null) {
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			String pattern = "yyyy-MM-dd";
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
			String dateStr = simpleDateFormat.format(dynamicQuery.getDueDateFilter());			
			criteria.add(
				// find duedate today or before
				Criteria.where("duedate")
					.lte(LocalDate.parse(dateStr, dtf).plusDays(1).atStartOfDay()) //TEST
			);
		}

		if(dynamicQuery.getAddedDateFilter() != null) {
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			String pattern = "yyyy-MM-dd";
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
			String dateStr = simpleDateFormat.format(dynamicQuery.getAddedDateFilter());

			criteria.add(
				// find addeddate between now and start of today, 
				// i.e. vocab added today
				Criteria.where("addeddate")
					.gt(LocalDate.parse(dateStr, dtf).atStartOfDay())
			);
			
		}


		if(!criteria.isEmpty()) {
			query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[criteria.size()])));
		}
		return mongoTemplate.find(query, Vocab.class);
	}

	
	@Override
	public int count(DynamicQuery dynamicQuery) {
		final Query query = new Query();
		final List<Criteria> criteria = new ArrayList<>();

		// count added today
		if(dynamicQuery.getAddedDateFilter() != null) {

			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			String pattern = "yyyy-MM-dd";
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
			String dateStr = simpleDateFormat.format(dynamicQuery.getAddedDateFilter());

			criteria.add(
                Criteria 
				.where("addeddate")
				//.lte(LocalDate.parse(dateStr, dtf).plusDays(1))  
				.gt(LocalDate.parse(dateStr, dtf).atStartOfDay()) // ok?
			);
		}

		// count words that are due today (i.e. duedate = today or before)
		if(dynamicQuery.getDueDateFilter() != null) {

			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			String pattern = "yyyy-MM-dd";
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
			String dateStr = simpleDateFormat.format(dynamicQuery.getAddedDateFilter());

			criteria.add(
                Criteria 
				.where("duedate")
				.lte(LocalDate.parse(dateStr, dtf).plusDays(1).atStartOfDay())  
			);
		}

		// count words that have been shown to the user before i.e. where addeddate is not null
		if(dynamicQuery.getSeenFilter() != null) {
			criteria.add(
				Criteria 
				.where("addeddate")
				.ne(null) 
			);
		}

		if(!criteria.isEmpty()) {
			query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[criteria.size()])));
		}

		return (int) mongoTemplate.count(query, Vocab.class);
	}

	@Override
	public boolean existsQuery(DynamicQuery dynamicQuery) {
		final Query query = new Query();
		final List<Criteria> criteria = new ArrayList<>();

		if(dynamicQuery.getDueDateFilter() != null) {
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			String pattern = "yyyy-MM-dd";
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
			String dateStr = simpleDateFormat.format(dynamicQuery.getDueDateFilter());			
			// find duedate today or before
			criteria.add(
				Criteria.where("duedate")
					.lte(LocalDate.parse(dateStr, dtf).plusDays(1).atStartOfDay())
			);
		}


		// find added date which IS null i.e. vocab has not been shown
		if(dynamicQuery.getAddedDateFilter() != null) {
			criteria.add(
				Criteria.where("addeddate")
					.is(null)
			);
		}

		if(!criteria.isEmpty()) {
			query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[criteria.size()])));
		}
		return mongoTemplate.exists(query, Vocab.class);
	}
	
}