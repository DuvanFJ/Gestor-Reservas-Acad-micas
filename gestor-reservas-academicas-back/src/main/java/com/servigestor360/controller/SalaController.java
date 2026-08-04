package com.servigestor360.controller;

import com.servigestor360.entity.Sala;
import com.servigestor360.service.SalaService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * Controlador REST encargado de gestionar las operaciones CRUD
 * relacionadas con las salas académicas.
 */
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/salas")
public class SalaController {

    @Autowired
    private SalaService salaService;

    /**
     * Obtiene el listado completo de salas.
     */
    @GetMapping
    public List<Sala> listarSalas() {
        return salaService.listarSalas();
    }

    /**
     * Busca una sala por su identificador.
     */
    @GetMapping("/{id}")
    public Sala buscarPorId(@PathVariable Integer id) {
        return salaService.buscarPorId(id);
    }

    /**
     * Registra una nueva sala.
     */
    @PostMapping
    public Sala guardarSala(@Valid @RequestBody Sala sala) {
        return salaService.guardarSala(sala);
    }

    /**
     * Actualiza la información de una sala existente.
     */
    @PutMapping("/{id}")
    public Sala actualizarSala(
            @PathVariable Integer id,
            @RequestBody Sala sala) {

        return salaService.actualizarSala(id, sala);
    }

    /**
     * Elimina una sala según su identificador.
     */
    @DeleteMapping("/{id}")
    public void eliminarSala(@PathVariable Integer id) {
        salaService.eliminarSala(id);
    }
}