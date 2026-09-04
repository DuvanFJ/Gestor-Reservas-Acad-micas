package com.servigestor360.controller;

import com.servigestor360.entity.Usuario;
import com.servigestor360.service.LoginService;
import com.servigestor360.service.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/auth")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> iniciarSesion(@RequestBody LoginRequest loginRequest) {

        Usuario usuario = loginService.iniciarSesion(
                loginRequest.getCorreo(),
                loginRequest.getPassword());

        if (usuario != null) {

            String token = jwtService.generarToken(
                    usuario.getCorreo(),
                    usuario.getRol());

            return ResponseEntity.ok(Map.of("token", token));
        }

        return ResponseEntity.status(401).body("Correo o contraseña incorrectos");
    }

    public static class LoginRequest {

        private String correo;
        private String password;

        public String getCorreo() {
            return correo;
        }

        public void setCorreo(String correo) {
            this.correo = correo;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}