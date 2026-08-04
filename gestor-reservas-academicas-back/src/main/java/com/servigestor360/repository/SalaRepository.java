package com.servigestor360.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.servigestor360.entity.Sala;

/**
 * Repositorio encargado del acceso a los datos de la entidad Sala.
 * Hereda los métodos CRUD proporcionados por Spring Data JPA.
 */
public interface SalaRepository extends JpaRepository<Sala, Integer> {

}