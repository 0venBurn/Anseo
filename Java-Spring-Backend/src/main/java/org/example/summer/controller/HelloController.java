package org.example.summer.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {


    @Value("${DB_USERNAME}")
    private String dbUsername;

    @GetMapping("/hello")
    public String sayHello(){
        return "Hello from Spring Backend! Here is a environment variable: " + dbUsername;
    }

}
