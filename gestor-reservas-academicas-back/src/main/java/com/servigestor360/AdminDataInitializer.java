
package com.servigestor360;

import com.servigestor360.entity.Usuario;
import com.servigestor360.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminDataInitializer implements ApplicationRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${ADMIN_EMAIL:}")
    private String adminEmail;

    @Value("${ADMIN_PASSWORD:}")
    private String adminPassword;

    @Value("${ADMIN_NAME:Administrador}")
    private String adminName;

    public AdminDataInitializer(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder) {

        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) {

        // Si no se configuraron credenciales, no crear administrador.
        if (adminEmail == null || adminEmail.isBlank()) {
            return;
        }

        if (adminPassword == null || adminPassword.isBlank()) {
            throw new IllegalStateException(
                    "ADMIN_PASSWORD debe configurarse cuando se define ADMIN_EMAIL."
            );
        }

        // Evitar crear administradores duplicados.
        if (usuarioRepository.findByCorreo(adminEmail).isPresent()) {
            System.out.println(
                    "El administrador configurado ya existe."
            );
            return;
        }

        Usuario administrador = new Usuario();

        administrador.setNombre(adminName);
        administrador.setCorreo(adminEmail);
        administrador.setPassword(
                passwordEncoder.encode(adminPassword)
        );
        administrador.setRol("ADMIN");

        usuarioRepository.save(administrador);

        System.out.println(
                "Administrador inicial creado correctamente."
        );
    }
}
