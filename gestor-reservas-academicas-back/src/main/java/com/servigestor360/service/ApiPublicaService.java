package com.servigestor360.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ApiPublicaService {

    private final RestTemplate restTemplate;

    public ApiPublicaService() {
        this.restTemplate = new RestTemplate();
    }

    // =========================================================
    // API PÚBLICA DE USUARIOS
    // =========================================================

    public String obtenerUsuariosExternos() {

        String url = "https://jsonplaceholder.typicode.com/users";

        return restTemplate.getForObject(url, String.class);
    }

    // =========================================================
    // API EXTERNA DE COLOMBIA
    // =========================================================

    public String obtenerDepartamentos() {

        String url = "https://api-colombia.com/api/v1/Department";

        return restTemplate.getForObject(url, String.class);
    }

    public String obtenerMunicipiosPorDepartamento(Integer idDepartamento) {

        String url = "https://api-colombia.com/api/v1/Department/"
                + idDepartamento
                + "/cities";

        return restTemplate.getForObject(url, String.class);
    }
}