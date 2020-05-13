package com.study.backend.service;

import com.study.backend.data.Vocab;
import com.study.backend.exception.EntityNotFoundException;
import com.study.backend.logging.Logger;
import com.study.backend.repository.DynamicQuery;
import com.study.backend.repository.VocabRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
public class VocabService {

    Logger logger = new Logger();
    Random ran = new Random(); 

    @Autowired
    private VocabRepository vocabRepository;

    /* due vocabs */

    public List<Vocab> findRandomDue(int number) {
        Date today = new Date(); 
        DynamicQuery dynamicQuery = new DynamicQuery();
		dynamicQuery.setDueDateFilter(today);     
        List<Vocab> result = vocabRepository.query(dynamicQuery); 

        List<Vocab> vocabs = new ArrayList<Vocab>();
        int n = result.size();
        if (n != 0) {

            if(n <= number) {
                vocabs = result;
            } else {
                for (int i = 0; i < Math.min(number, n); i++) {
                    int r = (int) ran.nextInt(result.size());        
                    vocabs.add(result.get(r));
                    result.remove(r);
                }
            }
        }

        return vocabs;
    }

    public List<Vocab> findAllDue() {
        Date today = new Date(); 
        //List<Vocab> result = vocabRepository.findByDuedateBefore(duedate); 
        DynamicQuery dynamicQuery = new DynamicQuery();
		dynamicQuery.setDueDateFilter(today);     
        List<Vocab> result = vocabRepository.query(dynamicQuery); 
        return result;
    }

    public int countAllDue() {
        Date today = new Date(); 
        DynamicQuery dynamicQuery = new DynamicQuery();
		dynamicQuery.setDueDateFilter(today);     
        List<Vocab> result = vocabRepository.query(dynamicQuery); 
        return result.size();
    }

    public boolean dueVocabExists() {
        DynamicQuery dynamicQuery = new DynamicQuery();
		dynamicQuery.setDueDateFilter(new Date());     
        return vocabRepository.existsQuery(dynamicQuery); 
    }

    /* unseen vocabs */

    public List<Vocab> findRandomUnseen(int number) {
        List<Vocab> result = vocabRepository.findByAddeddate(null); 
        List<Vocab> vocabs = new ArrayList<Vocab>();
        int n = result.size();
        if (n != 0) {

            if(n <= number) {
                vocabs = result;
            } else {
                for (int i = 0; i < Math.min(number, n); i++) {
                    int r = (int) ran.nextInt(result.size());        
                    vocabs.add(result.get(r));
                    result.remove(r);
                }
            }
        }

        return vocabs;
    }

	public List<Vocab> findAllUnseen() {
		return vocabRepository.findByAddeddate(null); 
	}

    public boolean unseenVocabExists() {
        DynamicQuery dynamicQuery = new DynamicQuery();
		dynamicQuery.setAddedDateFilter(new Date());     
        return vocabRepository.existsQuery(dynamicQuery); 
    }

   /* added today */

    public int countAddedToday() {
        Date today = new Date(); 
        DynamicQuery dynamicQuery = new DynamicQuery();
		dynamicQuery.setAddedDateFilter(today);     
        return vocabRepository.countAddedToday(dynamicQuery);
    }

    public List<Vocab> findAllAddedToday() {
        Date today = new Date(); 
        DynamicQuery dynamicQuery = new DynamicQuery();
		dynamicQuery.setAddedDateFilter(today);     
        return vocabRepository.query(dynamicQuery);
    }

    /* general */

    public List<Vocab> findAll(){
        return (List<Vocab>) vocabRepository.findAll();
    }

    public Vocab findById(String id){
        return vocabRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Vocab save(Vocab vocab){
        return vocabRepository.save(vocab);
    }

    public void deleteById(String id){
        vocabRepository.deleteById(id);
    }

}