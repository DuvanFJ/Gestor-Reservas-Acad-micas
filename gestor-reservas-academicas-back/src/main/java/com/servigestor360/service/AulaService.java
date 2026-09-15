package com.servigestor360.service;

import com.servigestor360.entity.Aula;
import com.servigestor360.repository.AulaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AulaService {

    @Autowired
    private AulaRepository aulaRepository;

    // Listar todas las aulas.
    public List<Aula> listarAulas() {
        return aulaRepository.findAll();
    }

    // Guardar una nueva aula.
    public Aula guardarAula(Aula aula) {
        return aulaRepository.save(aula);
    }

    // Buscar un aula por su ID.
    public Aula buscarPorId(Integer id) {
        return aulaRepository.findById(id).orElse(null);
    }

    // Actualizar un aula existente.
    public Aula actualizarAula(Integer id, Aula aulaActualizada) {

        Aula aula = aulaRepository.findById(id).orElse(null);

        if (aula != null) {

            aula.setNombre(aulaActualizada.getNombre());
            aula.setEdificio(aulaActualizada.getEdificio());
            aula.setCapacidad(aulaActualizada.getCapacidad());
            aula.setTipo(aulaActualizada.getTipo());
            aula.setActiva(aulaActualizada.getActiva());
            aula.setDepartamento(aulaActualizada.getDepartamento());
            aula.setMunicipio(aulaActualizada.getMunicipio());

            return aulaRepository.save(aula);
        }

        return null;
    }

    // Eliminar un aula por su ID.
    public void eliminarAula(Integer id) {
        aulaRepository.deleteById(id);
    }
}