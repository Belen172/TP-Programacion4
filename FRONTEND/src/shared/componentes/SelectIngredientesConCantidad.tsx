import { useEffect, useState } from "react";
import { Box, Stack, TextField, Typography, IconButton, MenuItem, Button } from "@mui/material";
import { IngredienteService } from "src/features/Ingrediente/services/IngredienteService";
import { Add, Delete } from "@mui/icons-material";

interface IngredienteCantidad {
  id_ingrediente: number;
  cantidad: number;
}

interface Props {
  value: IngredienteCantidad[];
  onChange: (nuevoValor: IngredienteCantidad[]) => void;
}

export function SelectIngredientesConCantidad({ value, onChange }: Props) {
  const [ingredientesDisponibles, setIngredientesDisponibles] = useState<{ id_ingrediente: number; nombre: string }[]>([]);

  useEffect(() => {
    IngredienteService.obtenerIngredientes().then(setIngredientesDisponibles);
  }, []);

  const handleAgregarFila = () => {
    onChange([...value, { id_ingrediente: 0, cantidad: 0 }]);
  };

  const handleEliminarFila = (index: number) => {
    const nuevos = value.filter((_, i) => i !== index);
    onChange(nuevos);
  };

  const handleCambiarValor = (index: number, campo: string, nuevoValor: any) => {
    const nuevos = value.map((item, i) =>
      i === index ? { ...item, [campo]: nuevoValor } : item
    );
    onChange(nuevos);
  };

  return (
    <Box>
      <Typography variant="subtitle1"><b><u>Ingredientes y cantidades</u></b></Typography>
    
      <Stack spacing={2} py={3}>
        {value.map((item, index) => (
          <Box key={index} display="flex" alignItems="center" gap={1}>
            <TextField
              select
              label={`Ingrediente ${index + 1}`}
              variant="outlined"
              fullWidth
              value={item.id_ingrediente}
              onChange={(e) => handleCambiarValor(index, "id_ingrediente", Number(e.target.value))}
            >
            {ingredientesDisponibles.map((ing) => (
                <MenuItem key={ing.id_ingrediente} value={ing.id_ingrediente}>
                  {ing.nombre}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label={`cantidad`}
              type = "number"
              variant="outlined"
              fullWidth
              value={item.cantidad}
              onChange={(e) => handleCambiarValor(index, "cantidad", Number(e.target.value))}
            />

            <IconButton color="error" onClick={() => handleEliminarFila(index)}>
              <Delete />
            </IconButton>
          </Box>
        ))}

        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={handleAgregarFila}
          sx={{ alignSelf: "flex-start" }}
        >
          Agregar Ingrediente
        </Button>
      </Stack>

    </Box>
  );
}
