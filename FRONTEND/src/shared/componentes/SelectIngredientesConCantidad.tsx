import { useEffect, useState } from "react";
import { Box, Grid, TextField, Typography, IconButton, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IngredienteService } from "src/features/Ingrediente/services/IngredienteService";

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
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" gutterBottom>Ingredientes y Cantidades</Typography>
      {value.map((item, index) => (
        <Grid container spacing={1} key={index} alignItems="center">
          <Grid size={{xs:6}} >
            <TextField
              select
              fullWidth
              label="Ingrediente"
              value={item.id_ingrediente}
              onChange={(e) =>
                handleCambiarValor(index, "id_ingrediente", Number(e.target.value))
              }
            >
              {ingredientesDisponibles.map((ing) => (
                <MenuItem key={ing.id_ingrediente} value={ing.id_ingrediente}>
                  {ing.nombre}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{xs:4}}>
            <TextField
              type="number"
              label="Cantidad"
              fullWidth
              value={item.cantidad}
              onChange={(e) =>
                handleCambiarValor(index, "cantidad", Number(e.target.value))
              }
            />
          </Grid>
          <Grid size={{xs:2}}>
            <IconButton color="error" onClick={() => handleEliminarFila(index)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <IconButton color="primary" onClick={handleAgregarFila}>
        <AddCircleOutlineIcon />
      </IconButton>
    </Box>
  );
}
