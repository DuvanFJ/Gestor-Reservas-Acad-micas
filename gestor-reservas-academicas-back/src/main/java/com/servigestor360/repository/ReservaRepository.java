package com.servigestor360.repository;

import com.servigestor360.entity.Reserva;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

/**
 * Repositorio encargado del acceso a los datos de la entidad Reserva.
 */
public interface ReservaRepository extends JpaRepository<Reserva, Integer> {

    /**
     * Busca reservas de una sala en una fecha determinada
     * cuyos horarios se cruzan con el horario indicado.
     */
    List<Reserva> findBySala_IdSalaAndFechaReservaAndHoraInicioLessThanAndHoraFinGreaterThan(
            Integer idSala,
            LocalDate fechaReserva,
            LocalTime horaFin,
            LocalTime horaInicio
    );

    /**
     * Obtiene todas las reservas pertenecientes
     * a un usuario mediante su correo.
     */
    List<Reserva> findByCorreoSolicitante(String correoSolicitante);

    /**
     * Busca una reserva específica perteneciente
     * a un usuario determinado.
     */
    java.util.Optional<Reserva> findByIdReservaAndCorreoSolicitante(
            Integer idReserva,
            String correoSolicitante
    );
}