package com.servigestor360.controller;

import com.servigestor360.entity.Aula;
import com.servigestor360.service.AulaService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/aulas")
public class AulaController {

    @Autowired
    private AulaService aulaService;

    // Consultar todas las aulas.
    @GetMapping
    public List<Aula> listarAulas() {
        return aulaService.listarAulas();
    }

    // Consultar un aula por su ID.
    @GetMapping("/{id}")
    public Aula buscarPorId(@PathVariable Integer id) {
        return aulaService.buscarPorId(id);
    }

    // Registrar una nueva aula.
    @PostMapping
    public Aula guardarAula(@Valid @RequestBody Aula aula) {
        return aulaService.guardarAula(aula);
    }

    // Actualizar un aula existente.
    @PutMapping("/{id}")
    public Aula actualizarAula(
            @PathVariable Integer id,
            @Valid @RequestBody Aula aula) {

        return aulaService.actualizarAula(id, aula);
    }

    // Eliminar un aula.
    @DeleteMapping("/{id}")
    public void eliminarAula(@PathVariable Integer id) {
        aulaService.eliminarAula(id);
    }
}