import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, id, ...props }: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div style={{ marginBottom: "1rem" }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "500",
            color: "var(--foreground)",
          }}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        {...props}
        style={{
          width: "100%",
          padding: "0.75rem",
          background: "var(--input-bg)",
          border: `1px solid ${error ? "var(--error)" : "var(--border)"}`,
          borderRadius: "0.375rem",
          color: "var(--foreground)",
          fontSize: "1rem",
          outline: "none",
          transition: "border-color 0.2s",
          ...props.style,
        }}
      />
      {error && (
        <p
          style={{
            marginTop: "0.25rem",
            fontSize: "0.875rem",
            color: "var(--error)",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
