import { useEffect, useState } from "react";
import axios from "axios";
import { TextField, MenuItem } from "@mui/material";
import type { Categoria } from "src/features/Categoria/types/CategoriaTypes";

interface SelectCategoriaProps {
  value: number | "";                     // el ID seleccionado (si estás editando)
  onChange: (id: number) => void;         // se ejecuta cuando cambia
}

export const SelectCategoria = ({ value, onChange }: SelectCategoriaProps) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    axios.get<Categoria[]>("http://localhost:3000/api/categoria")
      .then(res => setCategorias(res.data))
      .catch(console.error);
  }, []);

  return (
    <TextField
      select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="form-select"
      fullWidth
      label = "Categoria"
    >
      {categorias.map(p => (
        <MenuItem key={p.id_categoria} value={p.id_categoria}>
          {p.nombre}
        </ MenuItem>
      ))}
    </TextField>

  );
};