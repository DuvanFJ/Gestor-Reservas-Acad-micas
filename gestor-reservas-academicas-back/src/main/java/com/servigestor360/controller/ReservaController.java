package com.servigestor360.controller;

import com.servigestor360.entity.Reserva;
import com.servigestor360.service.ReservaService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public Reserva buscarPorId(
            @PathVariable Integer id) {

        return reservaService.buscarPorId(id);

    }


    /**
     * Registra una nueva reserva.
     */
    @PostMapping
    public ResponseEntity<?> guardarReserva(
            @Valid @RequestBody Reserva reserva) {

        try {

            Reserva nuevaReserva =
                    reservaService.guardarReserva(reserva);

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(nuevaReserva);

        } catch (IllegalStateException e) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(e.getMessage());

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());

        }

    }


    /**
     * Actualiza una reserva existente.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarReserva(
            @PathVariable Integer id,
            @Valid @RequestBody Reserva reserva) {

        try {

            Reserva reservaActualizada =
                    reservaService.actualizarReserva(
                            id,
                            reserva
                    );

            if (reservaActualizada == null) {

                return ResponseEntity
                        .notFound()
                        .build();

            }


            return ResponseEntity
                    .ok(reservaActualizada);

        } catch (IllegalStateException e) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(e.getMessage());

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());

        }

    }


    /**
     * Elimina una reserva según su identificador.
     */
    @DeleteMapping("/{id}")
    public void eliminarReserva(
            @PathVariable Integer id) {

        reservaService.eliminarReserva(id);

    }

}