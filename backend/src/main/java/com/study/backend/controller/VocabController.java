package com.study.backend.controller;

import com.study.backend.data.Vocab;
import com.study.backend.service.VocabService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vocab")
public class VocabController {

    @Autowired
    private VocabService vocabService;

    @GetMapping
    public List<Vocab> findAll(){
        return vocabService.findAll();
    }

    @GetMapping("/{id}")
    public Vocab findById(@PathVariable String id){
        return vocabService.findById(id);
    }

    /* 
    number 
    ... number of items that will be retrieved from database
    if there are less available, all available will be retrieved
    */
    @GetMapping("/randomdue/{number}")
    public List<Vocab> findRandomSeen(@PathVariable int number){
        return vocabService.findRandomDue(number);
    }

    @GetMapping("/anydue")
    public boolean dueVocabExists(){
        return vocabService.dueVocabExists();
    }

    @GetMapping("/anyunseen")
    public boolean unseenExists(){
        return vocabService.unseenVocabExists();
    }

    @GetMapping("/alldue")
    public List<Vocab> findAllDue(){
        return vocabService.findAllDue();
    }

    @GetMapping("/allunseen")
    public List<Vocab> findAllUnseen(){
        return vocabService.findAllUnseen();
    }

    @GetMapping("/countdue")
    public int countDue(){
        return vocabService.countAllDue();
    }

    @GetMapping("/countaddedtoday")
    public int countAddedToday(){
        return vocabService.countAddedToday();
    }

    
    @GetMapping("/alladdedtoday")
    public List<Vocab> findAllAddedToday(){
        return vocabService.findAllAddedToday();
    }

    /* 
    number 
    ... number of items that will be retrieved from database
    if there are less available, all available will be retrieved
    */
    @GetMapping("/randomunseen/{number}")
    public List<Vocab> findRandomUnseen(@PathVariable int number){
        return vocabService.findRandomUnseen(number);
    }

    @PostMapping
    public Vocab create(@RequestBody Vocab vocab){
        return vocabService.save(vocab);
    }

    @PutMapping("/{id}")
    public Vocab update(@RequestBody Vocab vocab){
        return vocabService.save(vocab);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id){
        vocabService.deleteById(id);
    }

}