package com.servigestor360.service;

import com.servigestor360.entity.Usuario;
import com.servigestor360.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario iniciarSesion(String correo, String password) {

        Usuario usuario = usuarioRepository.findByCorreo(correo).orElse(null);

        if (usuario != null &&
                passwordEncoder.matches(password, usuario.getPassword())) {

            return usuario;
        }

        return null;
    }
}