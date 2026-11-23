package com.servigestor360.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;

@Configuration
public class SecurityConfig {

        private final JwtAuthenticationFilter jwtAuthenticationFilter;

        public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
                this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        }

        @Value("${FRONTEND_URL:http://localhost:5173}")
        private String frontendUrl;

        @Bean
        public SecurityFilterChain securityFilterChain(
                        HttpSecurity http) throws Exception {

                http
                                .cors(cors -> cors.configurationSource(
                                                corsConfigurationSource()))

                                .csrf(csrf -> csrf.disable())

                                .sessionManagement(session -> session.sessionCreationPolicy(
                                                SessionCreationPolicy.STATELESS))

                                .authorizeHttpRequests(auth -> auth

                                                // ==========================================
                                                // CORS
                                                // ==========================================

                                                .requestMatchers(
                                                                HttpMethod.OPTIONS,
                                                                "/**")
                                                .permitAll()

                                                // ==========================================
                                                // AUTENTICACIÓN
                                                // ==========================================

                                                .requestMatchers(
                                                                "/api/auth/login")
                                                .permitAll()

                                                // ==========================================
                                                // APIs PÚBLICAS
                                                // ==========================================

                                                .requestMatchers(
                                                                "/api/publica/**")
                                                .permitAll()

                                                // ==========================================
                                                // USUARIOS
                                                // ==========================================

                                                .requestMatchers(
                                                                "/api/usuarios/**")
                                                .hasRole("ADMIN")

                                                // ==========================================
                                                // SALAS
                                                // ==========================================

                                                // ADMIN y USUARIO pueden consultar salas.
                                                .requestMatchers(
                                                                HttpMethod.GET,
                                                                "/salas/**")
                                                .hasAnyRole("ADMIN", "USUARIO")

                                                // Solo ADMIN puede crear salas.
                                                .requestMatchers(
                                                                HttpMethod.POST,
                                                                "/salas/**")
                                                .hasRole("ADMIN")

                                                // Solo ADMIN puede actualizar salas.
                                                .requestMatchers(
                                                                HttpMethod.PUT,
                                                                "/salas/**")
                                                .hasRole("ADMIN")

                                                // Solo ADMIN puede eliminar salas.
                                                .requestMatchers(
                                                                HttpMethod.DELETE,
                                                                "/salas/**")
                                                .hasRole("ADMIN")

                                                // ==========================================
                                                // AULAS
                                                // ==========================================

                                                // ADMIN y USUARIO pueden consultar aulas.
                                                .requestMatchers(
                                                                HttpMethod.GET,
                                                                "/api/aulas/**")
                                                .hasAnyRole("ADMIN", "USUARIO")

                                                // Solo ADMIN puede crear aulas.
                                                .requestMatchers(
                                                                HttpMethod.POST,
                                                                "/api/aulas/**")
                                                .hasRole("ADMIN")

                                                // Solo ADMIN puede actualizar aulas.
                                                .requestMatchers(
                                                                HttpMethod.PUT,
                                                                "/api/aulas/**")
                                                .hasRole("ADMIN")

                                                // Solo ADMIN puede eliminar aulas.
                                                .requestMatchers(
                                                                HttpMethod.DELETE,
                                                                "/api/aulas/**")
                                                .hasRole("ADMIN")

                                                // ==========================================
                                                // RESERVAS
                                                // ==========================================

                                                // ADMIN y USUARIO pueden consultar reservas.
                                                //
                                                // El filtrado de las reservas propias
                                                // se realiza en ReservaService.
                                                .requestMatchers(
                                                                HttpMethod.GET,
                                                                "/reservas/**")
                                                .hasAnyRole("ADMIN", "USUARIO")

                                                // ADMIN y USUARIO pueden crear reservas.
                                                .requestMatchers(
                                                                HttpMethod.POST,
                                                                "/reservas/**")
                                                .hasAnyRole("ADMIN", "USUARIO")

                                                // ADMIN y USUARIO pueden actualizar reservas.
                                                //
                                                // ReservaService verifica que el USUARIO
                                                // solamente pueda modificar las propias.
                                                .requestMatchers(
                                                                HttpMethod.PUT,
                                                                "/reservas/**")
                                                .hasAnyRole("ADMIN", "USUARIO")

                                                // ADMIN y USUARIO pueden eliminar reservas.
                                                //
                                                // ReservaService verifica la propiedad.
                                                .requestMatchers(
                                                                HttpMethod.DELETE,
                                                                "/reservas/**")
                                                .hasAnyRole("ADMIN", "USUARIO")

                                                // ==========================================
                                                // RESTO DE ENDPOINTS
                                                // ==========================================

                                                .anyRequest().authenticated())

                                .addFilterBefore(
                                                jwtAuthenticationFilter,
                                                UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {

                CorsConfiguration configuration = new CorsConfiguration();

                configuration.setAllowedOrigins(
                                List.of(
                                                "http://localhost:5173",
                                                frontendUrl.trim()));

                configuration.setAllowedMethods(
                                List.of(
                                                "GET",
                                                "POST",
                                                "PUT",
                                                "DELETE",
                                                "OPTIONS"));

                configuration.setAllowedHeaders(
                                List.of(
                                                "Authorization",
                                                "Content-Type"));

                configuration.setAllowCredentials(true);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

                source.registerCorsConfiguration(
                                "/**",
                                configuration);

                return source;
        }

        @Bean
        public PasswordEncoder passwordEncoder() {

                return new BCryptPasswordEncoder();
        }
}