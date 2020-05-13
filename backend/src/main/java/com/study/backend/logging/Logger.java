package com.study.backend.logging;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintWriter;

public class Logger {
    public void log(String text) {
        PrintWriter writer;
        try {
            writer = new PrintWriter(new FileOutputStream(new File("studyapplog.txt"),true)); 
            writer.append(text);
            writer.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    } 
} 