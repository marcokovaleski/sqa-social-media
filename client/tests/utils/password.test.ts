import { isPasswordValid, getPasswordValidationMessage } from "@/utils/password";

describe("Utils - Password", () => {
  describe("function isPasswordValid", () => {
    test("should return true for valid passwords", () => {
      const validPasswords = [
        "Password123!",
        "MySecure1@",
        "TestPass456#",
        "StrongP@ss1"
      ];

      validPasswords.forEach(password => {
        expect(isPasswordValid(password)).toBe(true);
      });
    });

    test("should return false for invalid passwords", () => {
      const invalidPasswords = [
        "password",
        "PASSWORD", 
        "Password",
        "Password1",
        "Pass1!",
        "12345678",
        "!@#$%^&*",
        ""
      ];

      invalidPasswords.forEach(password => {
        expect(isPasswordValid(password)).toBe(false);
      });
    });

    test("should reject passwords with exactly 8 characters - BUG TEST", () => {
      // Este teste DEVERIA FALHAR porque a implementação atual
      // rejeita incorretamente senhas com exatamente 8 caracteres
      // A condição `password.length <= 8` deveria ser `password.length < 8`
      
      const passwordWithExactly8Chars = "Pass123!";
      
      // Deveria ser true (senha válida) mas a implementação atual retorna false
      expect(isPasswordValid(passwordWithExactly8Chars)).toBe(true);
    });
  });

  describe("function getPasswordValidationMessage", () => {
    test("should return empty string for valid passwords", () => {
      const validPassword = "Password123!";
      expect(getPasswordValidationMessage(validPassword)).toBe("");
    });

    test("should return error message for invalid passwords", () => {
      const invalidPassword = "pass";
      const message = getPasswordValidationMessage(invalidPassword);
      expect(message).toContain("mínimo de 8 caracteres");
      expect(message).toContain("uma letra maiúscula");
      expect(message).toContain("um número");
      expect(message).toContain("um caractere especial");
    });
  });
});
