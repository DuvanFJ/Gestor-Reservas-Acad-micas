package com.servigestor360.service;

import com.servigestor360.entity.Sala;
import com.servigestor360.repository.SalaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Servicio encargado de contener la lógica de negocio
 * relacionada con las salas académicas.
 */
@Service
public class SalaService {

    @Autowired
    private SalaRepository SalaRepository;

    /**
     * Obtiene todas las salas registradas.
     */
    public List<Sala> listarSalas() {
        return SalaRepository.findAll();
    }

    /**
     * Guarda una nueva sala.
     */
    public Sala guardarSala(Sala sala) {
        return SalaRepository.save(sala);
    }

    /**
     * Busca una sala por su identificador.
     */
    public Sala buscarPorId(Integer id) {
        return SalaRepository.findById(id).orElse(null);
    }

    /**
     * Actualiza la información de una sala existente.
     */
    public Sala actualizarSala(Integer id, Sala salaActualizada) {

        Sala sala = SalaRepository.findById(id).orElse(null);

        if (sala != null) {

            sala.setNombreSala(salaActualizada.getNombreSala());
            sala.setTipoSala(salaActualizada.getTipoSala());
            sala.setCapacidad(salaActualizada.getCapacidad());
            sala.setUbicacion(salaActualizada.getUbicacion());
            sala.setDisponible(salaActualizada.getDisponible());

            return SalaRepository.save(sala);
        }

        return null;
    }

    /**
     * Elimina una sala por su identificador.
     */
    public void eliminarSala(Integer id) {
        SalaRepository.deleteById(id);
    }
}