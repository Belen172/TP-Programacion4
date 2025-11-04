import { useState } from "react";
import { Box, IconButton, TextField, Typography, Button, Stack } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

interface ListaPasosProps {
  label?: string;
  value: string[];
  onChange: (pasos: string[]) => void;
}

export function ListaPasos({ label = "Pasos", value, onChange }: ListaPasosProps) {
  const [pasos, setPasos] = useState<string[]>(value);

  const actualizar = (nuevos: string[]) => {
    // 🔹 Filtrar pasos vacíos o con solo espacios
    const filtrados = nuevos.filter((p) => p.trim() !== "");
    setPasos(nuevos);
    onChange(filtrados);
  };

  const handleAdd = () => actualizar([...pasos, ""]);
  const handleChange = (index: number, nuevoValor: string) =>
    actualizar(pasos.map((p, i) => (i === index ? nuevoValor : p)));
  const handleDelete = (index: number) => actualizar(pasos.filter((_, i) => i !== index));

  return (
    <Box>
      <Typography variant="subtitle1">
        <b><u>{label}</u></b>
      </Typography>

      <Stack spacing={2} py={3}>
        {pasos.map((paso, index) => (
          <Box key={index} display="flex" alignItems="center" gap={1}>
            <TextField
              label={`Paso ${index + 1}`}
              variant="outlined"
              fullWidth
              value={paso}
              onChange={(e) => handleChange(index, e.target.value)}
            />
            <IconButton color="error" onClick={() => handleDelete(index)}>
              <Delete />
            </IconButton>
          </Box>
        ))}

        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={handleAdd}
          sx={{ alignSelf: "flex-start" }}
        >
          Agregar paso
        </Button>
      </Stack>
    </Box>
  );
}