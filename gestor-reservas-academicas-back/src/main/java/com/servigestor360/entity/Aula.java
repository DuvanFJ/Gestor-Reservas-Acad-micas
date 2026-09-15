package com.servigestor360.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "aula")
public class Aula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idAula;

    @NotBlank(message = "El nombre o número del aula es obligatorio")
    private String nombre;

    @NotBlank(message = "El edificio es obligatorio")
    private String edificio;

    @Min(value = 1, message = "La capacidad debe ser mayor que cero")
    private Integer capacidad;

    @NotBlank(message = "El tipo de aula es obligatorio")
    private String tipo;

    private Boolean activa = true;

    private String departamento;

    private String municipio;

    public Aula() {
    }

    public Integer getIdAula() {
        return idAula;
    }

    public void setIdAula(Integer idAula) {
        this.idAula = idAula;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEdificio() {
        return edificio;
    }

    public void setEdificio(String edificio) {
        this.edificio = edificio;
    }

    public Integer getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(Integer capacidad) {
        this.capacidad = capacidad;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Boolean getActiva() {
        return activa;
    }

    public void setActiva(Boolean activa) {
        this.activa = activa;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public String getMunicipio() {
        return municipio;
    }

    public void setMunicipio(String municipio) {
        this.municipio = municipio;
    }
}