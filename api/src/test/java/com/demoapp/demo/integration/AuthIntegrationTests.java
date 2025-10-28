package com.demoapp.demo.integration;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.demoapp.demo.service.UserService;

@SpringBootTest
@ActiveProfiles("test")
public class AuthIntegrationTests {

    @Autowired
    private UserService userService;

    @Test
    @DisplayName("Password validation should work correctly with valid passwords")
    void testPasswordValidationSuccess() {
        String[] validPasswords = {
            "Password123!",
            "MySecure1@",
            "TestPass456#",
            "StrongP@ss1"
        };

        for (String password : validPasswords) {
            boolean isValid = userService.isPasswordValid(password);
            assertTrue(isValid, 
                String.format("Password '%s' should be valid but was rejected", password));
        }
    }

    @Test
    @DisplayName("Password validation should reject weak passwords")
    void testPasswordValidationFailure() {
        String[] invalidPasswords = {
            "password",
            "PASSWORD",
            "Password",
            "Password1",
            "Pass1!",
            "12345678",
            "!@#$%^&*",
            ""
        };

        for (String password : invalidPasswords) {
            boolean isValid = userService.isPasswordValid(password);
            assertFalse(isValid, 
                String.format("Password '%s' should be invalid but was accepted", password));
        }
    }
}
