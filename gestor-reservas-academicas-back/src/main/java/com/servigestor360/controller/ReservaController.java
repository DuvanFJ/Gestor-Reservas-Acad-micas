package com.servigestor360.controller;

import com.servigestor360.entity.Reserva;
import com.servigestor360.service.ReservaService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST encargado de gestionar las operaciones CRUD
 * relacionadas con las reservas académicas.
 */
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    /**
     * Obtiene el listado completo de reservas.
     */
    @GetMapping
    public List<Reserva> listarReservas() {
        return reservaService.listarReservas();
    }

    /**
     * Busca una reserva por su identificador.
     */
    @GetMapping("/{id}")
    public Reserva buscarPorId(@PathVariable Integer id) {
        return reservaService.buscarPorId(id);
    }

    /**
     * Registra una nueva reserva.
     */
    @PostMapping
    public Reserva guardarReserva(@Valid @RequestBody Reserva reserva) {
        return reservaService.guardarReserva(reserva);
    }

    /**
     * Actualiza una reserva existente.
     */
    @PutMapping("/{id}")
    public Reserva actualizarReserva(
            @PathVariable Integer id,
            @RequestBody Reserva reserva) {

        return reservaService.actualizarReserva(id, reserva);
    }

    /**
     * Elimina una reserva según su identificador.
     */
    @DeleteMapping("/{id}")
    public void eliminarReserva(@PathVariable Integer id) {
        reservaService.eliminarReserva(id);
    }
}