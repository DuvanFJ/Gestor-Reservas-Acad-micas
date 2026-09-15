package com.servigestor360.servigestor360;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class Servigestor360ApplicationTests {

    @Test
    void contextLoads() {
    }

    @Test
    void passwordDebeEncriptarseConBCrypt() {

        BCryptPasswordEncoder encoder =
                new BCryptPasswordEncoder();

        String password = "123456";

        String passwordEncriptada =
                encoder.encode(password);

        assertNotEquals(password, passwordEncriptada);

        assertTrue(
                encoder.matches(password, passwordEncriptada)
        );
    }

    @Test
    void passwordIncorrectaDebeSerRechazada() {

        BCryptPasswordEncoder encoder =
                new BCryptPasswordEncoder();

        String passwordCorrecta = "123456";

        String passwordEncriptada =
                encoder.encode(passwordCorrecta);

        assertFalse(
                encoder.matches("passwordIncorrecta", passwordEncriptada)
        );
    }
}