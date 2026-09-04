package com.servigestor360.repository;

import com.servigestor360.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    // Busca un usuario por su correo electrónico.
    // Se utilizará posteriormente para el proceso de autenticación.
    Optional<Usuario> findByCorreo(String correo);
}