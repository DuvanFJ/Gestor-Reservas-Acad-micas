package com.servigestor360.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private final long expirationTime = 1000 * 60 * 60; // 1 hora

    public String generarToken(String correo, String rol) {

        Date fechaActual = new Date();
        Date fechaExpiracion = new Date(fechaActual.getTime() + expirationTime);

        return Jwts.builder()
                .subject(correo)
                .claim("rol", rol)
                .issuedAt(fechaActual)
                .expiration(fechaExpiracion)
                .signWith(secretKey)
                .compact();
    }

    public Jws<Claims> validarToken(String token) {

        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token);
    }
}