package com.demoapp.demo.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class UserServiceBugTests {

    @Test
    @DisplayName("Email validation should reject invalid email formats - BUG TEST")
    void testEmailValidationBug() {
        UserService userService = new UserService(null);
        
        // Emails que deveriam ser inválidos mas a implementação atual aceita
        String[] invalidEmails = {
            "test@",
            "@test.com",
            "test",
            "test@.com",
            "test@com.",
            "test..test@com",
            ""
        };

        for (String invalidEmail : invalidEmails) {
            boolean isValid = userService.isEmailValid(invalidEmail);
            
            // Este teste DEVERIA FALHAR porque a implementação atual
            // aceita incorretamente estes emails inválidos
            assertFalse(isValid, 
                String.format("Email '%s' should be invalid but was accepted", invalidEmail));
        }
    }

    @Test
    @DisplayName("Email validation should accept valid email formats")
    void testEmailValidationValidEmails() {
        UserService userService = new UserService(null);
        
        // Emails que deveriam ser válidos
        String[] validEmails = {
            "test@example.com",
            "user.name@domain.co.uk",
            "test+tag@example.org",
            "user123@test-domain.com"
        };

        for (String validEmail : validEmails) {
            boolean isValid = userService.isEmailValid(validEmail);
            assertTrue(isValid, 
                String.format("Email '%s' should be valid but was rejected", validEmail));
        }
    }
}
