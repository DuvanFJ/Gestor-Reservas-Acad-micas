package com.servigestor360.service;

import com.servigestor360.entity.Usuario;
import com.servigestor360.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario iniciarSesion(String correo, String password) {

        Usuario usuario = usuarioRepository.findByCorreo(correo).orElse(null);

        if (usuario != null && usuario.getPassword().equals(password)) {
            return usuario;
        }

        return null;
    }
}