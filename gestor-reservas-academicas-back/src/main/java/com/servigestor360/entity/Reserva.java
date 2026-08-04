package com.servigestor360.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * Entidad que representa una reserva académica realizada
 * para una sala dentro del sistema.
 */
@Entity
public class Reserva {

    // Identificador único de la reserva
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idReserva;

    // Nombre de la persona que realiza la reserva
    @NotBlank(message = "El nombre del solicitante es obligatorio")
    private String nombreSolicitante;

    // Fecha en la que se realizará la reserva
    @NotNull(message = "La fecha de reserva es obligatoria")
    private LocalDate fechaReserva;

    // Hora de inicio de la reserva
    @NotNull(message = "La hora de inicio es obligatoria")
    private LocalTime horaInicio;

    // Hora de finalización de la reserva
    @NotNull(message = "La hora de fin es obligatoria")
    private LocalTime horaFin;

    // Estado actual de la reserva
    @NotBlank(message = "El estado es obligatorio")
    private String estado;

    // Sala asociada a la reserva
    @ManyToOne
    @JoinColumn(name = "id_sala")
    private Sala sala;

    // Constructor vacío requerido por JPA
    public Reserva() {
    }

    // Métodos Getters y Setters

    public Integer getIdReserva() {
        return idReserva;
    }

    public void setIdReserva(Integer idReserva) {
        this.idReserva = idReserva;
    }

    public String getNombreSolicitante() {
        return nombreSolicitante;
    }

    public void setNombreSolicitante(String nombreSolicitante) {
        this.nombreSolicitante = nombreSolicitante;
    }

    public LocalDate getFechaReserva() {
        return fechaReserva;
    }

    public void setFechaReserva(LocalDate fechaReserva) {
        this.fechaReserva = fechaReserva;
    }

    public LocalTime getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(LocalTime horaInicio) {
        this.horaInicio = horaInicio;
    }

    public LocalTime getHoraFin() {
        return horaFin;
    }

    public void setHoraFin(LocalTime horaFin) {
        this.horaFin = horaFin;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Sala getSala() {
        return sala;
    }

    public void setSala(Sala sala) {
        this.sala = sala;
    }
}