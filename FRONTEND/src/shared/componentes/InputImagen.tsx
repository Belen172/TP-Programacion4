import React, { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import { Box, Button, Typography } from "@mui/material";

interface ImageUploadProps {
  label?: string;
  value?: File | string | null;
  onChange: (file: File | null) => void;
}

export const InputImagen: React.FC<ImageUploadProps> = ({
  label = "Seleccionar imagen",
  value,
  onChange,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  if (typeof value === "string" && value) {
    setPreview(value); 
  }
}, [value]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPreview(file ? URL.createObjectURL(file) : null);
    onChange(file);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      width="100%"
    >
      <Typography variant="subtitle1" gutterBottom>{label}</Typography>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {preview && (
        <Box
          mt={2}
          sx={{
            width: 260,
            height: 180,
            borderRadius: 2,
            overflow: "hidden",
            border: "1px solid #ccc",
          }}
        >
          <img
            src={preview}
            alt="Vista previa"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      )}

      <Button
        variant="outlined"
        color="primary"
        onClick={() => fileInputRef.current?.click()}
        sx={{ mt: 2 }}
      >
        {value ? "Cambiar imagen" : "Seleccionar imagen"}
      </Button>
    </Box>
  );
};