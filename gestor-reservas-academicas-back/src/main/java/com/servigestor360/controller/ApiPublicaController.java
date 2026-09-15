package com.servigestor360.controller;

import com.servigestor360.service.ApiPublicaService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/publica")
@CrossOrigin(origins = "http://localhost:5173")
public class ApiPublicaController {

    private final ApiPublicaService apiPublicaService;

    public ApiPublicaController(ApiPublicaService apiPublicaService) {
        this.apiPublicaService = apiPublicaService;
    }

    // =========================================================
    // API PÚBLICA DE USUARIOS
    // =========================================================

    @GetMapping("/usuarios")
    public String obtenerUsuariosExternos() {
        return apiPublicaService.obtenerUsuariosExternos();
    }

    // =========================================================
    // API EXTERNA DE COLOMBIA
    // =========================================================

    @GetMapping("/colombia/departamentos")
    public String obtenerDepartamentos() {
        return apiPublicaService.obtenerDepartamentos();
    }

    @GetMapping("/colombia/departamentos/{id}/municipios")
    public String obtenerMunicipiosPorDepartamento(
            @PathVariable Integer id) {

        return apiPublicaService.obtenerMunicipiosPorDepartamento(id);
    }
}