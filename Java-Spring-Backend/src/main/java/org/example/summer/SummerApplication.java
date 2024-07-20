package org.example.summer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class SummerApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(SummerApplication.class, args);

        Environment env = context.getEnvironment();
        System.out.println("Datasource URL: " + env.getProperty("spring.datasource.url"));
        System.out.println("Datasource Username: " + env.getProperty("spring.datasource.username"));
        System.out.println("Datasource Password: " + env.getProperty("spring.datasource.password"));
    }
}

