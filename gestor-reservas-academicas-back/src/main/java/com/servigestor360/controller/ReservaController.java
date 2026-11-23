package com.servigestor360.controller;

import com.servigestor360.entity.Reserva;
import com.servigestor360.service.ReservaService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST encargado de gestionar las operaciones
 * relacionadas con las reservas académicas.
 */
@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;


    /**
     * Obtiene las reservas según el usuario autenticado.
     *
     * ADMIN:
     * obtiene todas las reservas.
     *
     * USUARIO:
     * obtiene solamente sus propias reservas.
     */
    @GetMapping
    public List<Reserva> listarReservas(
            Authentication authentication) {

        String correoUsuario =
                authentication.getName();

        boolean esAdmin =
                authentication.getAuthorities()
                        .stream()
                        .anyMatch(
                                autoridad ->
                                        autoridad.getAuthority()
                                                .equals("ROLE_ADMIN")
                        );

        return reservaService.listarReservas(
                correoUsuario,
                esAdmin
        );
    }


    /**
     * Busca una reserva por su identificador.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Reserva> buscarPorId(
            @PathVariable Integer id,
            Authentication authentication) {

        String correoUsuario =
                authentication.getName();

        boolean esAdmin =
                authentication.getAuthorities()
                        .stream()
                        .anyMatch(
                                autoridad ->
                                        autoridad.getAuthority()
                                                .equals("ROLE_ADMIN")
                        );

        Reserva reserva =
                reservaService.buscarPorId(
                        id,
                        correoUsuario,
                        esAdmin
                );

        if (reserva == null) {
            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity.ok(reserva);
    }


    /**
     * Registra una nueva reserva.
     *
     * El propietario se obtiene del usuario autenticado.
     *
     * El estado se establece automáticamente como Pendiente.
     */
    @PostMapping
    public ResponseEntity<?> guardarReserva(
            @Valid @RequestBody Reserva reserva,
            Authentication authentication) {

        try {

            String correoUsuario =
                    authentication.getName();

            Reserva nuevaReserva =
                    reservaService.guardarReserva(
                            reserva,
                            correoUsuario
                    );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
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
     *
     * ADMIN:
     * puede actualizar cualquier reserva.
     *
     * USUARIO:
     * solamente puede actualizar sus propias reservas.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarReserva(
            @PathVariable Integer id,
            @Valid @RequestBody Reserva reserva,
            Authentication authentication) {

        try {

            String correoUsuario =
                    authentication.getName();

            boolean esAdmin =
                    authentication.getAuthorities()
                            .stream()
                            .anyMatch(
                                    autoridad ->
                                            autoridad.getAuthority()
                                                    .equals("ROLE_ADMIN")
                            );

            Reserva reservaActualizada =
                    reservaService.actualizarReserva(
                            id,
                            reserva,
                            correoUsuario,
                            esAdmin
                    );

            if (reservaActualizada == null) {

                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(
                                "La reserva no existe "
                                        + "o no pertenece al usuario."
                        );
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
     * Elimina una reserva.
     *
     * ADMIN:
     * puede eliminar cualquier reserva.
     *
     * USUARIO:
     * solamente puede eliminar sus propias reservas.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarReserva(
            @PathVariable Integer id,
            Authentication authentication) {

        String correoUsuario =
                authentication.getName();

        boolean esAdmin =
                authentication.getAuthorities()
                        .stream()
                        .anyMatch(
                                autoridad ->
                                        autoridad.getAuthority()
                                                .equals("ROLE_ADMIN")
                        );

        boolean eliminada =
                reservaService.eliminarReserva(
                        id,
                        correoUsuario,
                        esAdmin
                );

        if (!eliminada) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(
                            "La reserva no existe "
                                    + "o no pertenece al usuario."
                    );
        }

        return ResponseEntity
                .ok()
                .body("Reserva eliminada correctamente.");
    }
}