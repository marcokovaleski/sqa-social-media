package com.demoapp.demo.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.demoapp.demo.dto.UserDTO;
import com.demoapp.demo.model.User;
import com.demoapp.demo.service.UserService;

@ExtendWith(MockitoExtension.class)
public class AuthControllerTests {

    @Mock
    private UserService userService;

    @InjectMocks
    private AuthController authController;

    private UserDTO validUserDTO;
    private User mockUser;

    @BeforeEach
    void setUp() {
        validUserDTO = new UserDTO();
        validUserDTO.setEmail("test@example.com");
        validUserDTO.setPassword("Test123!");

        mockUser = new User();
        mockUser.setId(1L);
        mockUser.setEmail("test@example.com");
        mockUser.setPassword("Test123!");
    }

    @Test
    @DisplayName("Signup should succeed with valid user data")
    void testSignupSuccess() {
        when(userService.isEmailValid(any())).thenReturn(true);
        when(userService.isPasswordValid(any())).thenReturn(true);
        when(userService.findByEmail(any())).thenReturn(null);
        when(userService.createUser(any(), any())).thenReturn(mockUser);

        ResponseEntity<?> response = authController.signup(validUserDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        verify(userService).createUser(validUserDTO.getEmail(), validUserDTO.getPassword());
    }

    @Test
    @DisplayName("Signup should fail with invalid email")
    void testSignupInvalidEmail() {
        when(userService.isEmailValid(any())).thenReturn(false);

        ResponseEntity<?> response = authController.signup(validUserDTO);

        assertEquals(HttpStatus.UNPROCESSABLE_ENTITY, response.getStatusCode());
        verify(userService, never()).createUser(any(), any());
    }

    @Test
    @DisplayName("Signin should succeed with valid credentials")
    void testSigninSuccess() {
        when(userService.isEmailValid(any())).thenReturn(true);
        when(userService.isPasswordValid(any())).thenReturn(true);
        when(userService.findByEmail(any())).thenReturn(mockUser);

        ResponseEntity<?> response = authController.signin(validUserDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }

    @Test
    @DisplayName("Signin should fail with invalid credentials")
    void testSigninInvalidCredentials() {
        when(userService.isEmailValid(any())).thenReturn(true);
        when(userService.isPasswordValid(any())).thenReturn(true);
        when(userService.findByEmail(any())).thenReturn(null);

        ResponseEntity<?> response = authController.signin(validUserDTO);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }

    @Test
    @DisplayName("Signin should fail with wrong password")
    void testSigninWrongPassword() {
        User userWithDifferentPassword = new User();
        userWithDifferentPassword.setId(1L);
        userWithDifferentPassword.setEmail("test@example.com");
        userWithDifferentPassword.setPassword("DifferentPassword123!");

        when(userService.isEmailValid(any())).thenReturn(true);
        when(userService.isPasswordValid(any())).thenReturn(true);
        when(userService.findByEmail(any())).thenReturn(userWithDifferentPassword);

        ResponseEntity<?> response = authController.signin(validUserDTO);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }
}
