package com.servigestor360;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Clase principal del proyecto.
 * Inicia la aplicación Spring Boot y configura automáticamente
 * todos los componentes necesarios para su ejecución.
 */
@SpringBootApplication
public class Servigestor360Application {

    /**
     * Método principal de ejecución de la aplicación.
     */
    public static void main(String[] args) {

        SpringApplication.run(Servigestor360Application.class, args);

    }

}