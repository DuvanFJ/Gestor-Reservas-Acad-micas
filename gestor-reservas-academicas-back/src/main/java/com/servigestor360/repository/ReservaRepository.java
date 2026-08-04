package com.servigestor360.repository;

import com.servigestor360.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repositorio encargado del acceso a los datos de la entidad Reserva.
 * Hereda los métodos CRUD proporcionados por Spring Data JPA.
 */
public interface ReservaRepository extends JpaRepository<Reserva, Integer> {

}