package com.servigestor360.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

/**
 * Entidad que representa una sala académica dentro del sistema.
 */
@Entity
public class Sala {

    // Identificador único de la sala
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idSala;

    // Nombre de la sala
    @NotBlank(message = "El nombre de la sala es obligatorio")
    private String nombreSala;

    // Tipo de sala (Laboratorio, Aula, Auditorio, etc.)
    @NotBlank(message = "El tipo de sala es obligatorio")
    private String tipoSala;

    // Capacidad máxima de personas
    @NotNull(message = "La capacidad es obligatoria")
    @Positive(message = "La capacidad debe ser mayor que cero")
    private Integer capacidad;

    // Ubicación física de la sala
    @NotBlank(message = "La ubicación es obligatoria")
    private String ubicacion;

    // Estado de disponibilidad de la sala
    @NotNull(message = "La disponibilidad es obligatoria")
    private Boolean disponible;

    // Constructor vacío requerido por JPA
    public Sala() {
    }

    // Métodos Getters y Setters

    public Integer getIdSala() {
        return idSala;
    }

    public void setIdSala(Integer idSala) {
        this.idSala = idSala;
    }

    public String getNombreSala() {
        return nombreSala;
    }

    public void setNombreSala(String nombreSala) {
        this.nombreSala = nombreSala;
    }

    public String getTipoSala() {
        return tipoSala;
    }

    public void setTipoSala(String tipoSala) {
        this.tipoSala = tipoSala;
    }

    public Integer getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(Integer capacidad) {
        this.capacidad = capacidad;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public Boolean getDisponible() {
        return disponible;
    }

    public void setDisponible(Boolean disponible) {
        this.disponible = disponible;
    }
}