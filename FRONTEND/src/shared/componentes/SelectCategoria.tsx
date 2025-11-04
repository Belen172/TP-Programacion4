import { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Autocomplete } from "@mui/material";
import type { Categoria } from "src/features/Categoria/types/CategoriaTypes";

interface SelectCategoriaProps {
  value: number | "";                
  onChange: (id: number) => void;    
}

export const SelectCategoria = ({ value, onChange }: SelectCategoriaProps) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    axios.get<Categoria[]>("http://localhost:3000/api/categoria")
      .then(res => setCategorias(res.data))
      .catch(console.error);
  }, []);

    const categoriaSeleccionada =
    categorias.find((c) => c.id_categoria === value) || null;

  return (
 <Autocomplete
      options={categorias}
      getOptionLabel={(option) => option.nombre}
      value={categoriaSeleccionada}
      onChange={(_, newValue) => {
        onChange(newValue ? newValue.id_categoria : 0);
      }}
      isOptionEqualToValue={(option, value) =>
        option.id_categoria === value.id_categoria
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Categoría"
          fullWidth
          variant="outlined"
        />
      )}
      noOptionsText="No hay categorías"
    />

  );
};