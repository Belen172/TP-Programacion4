import { useState } from "react";
import type { FormEvent } from "react";
import { RecetaService } from "../services/RecetaService";
import type { RecetaCrearDto } from "../types/RecetaTypes";
import { TextField, Button, Box, Grid, Typography, Stack, Divider } from "@mui/material";
import { SelectCategoria } from "src/shared/componentes/SelectCategoria";
import { SelectPais } from "src/shared/componentes/SelectPais";
import { ListaPasos } from "src/shared/componentes/ListaPasos";
import { useNavigate } from "react-router";
import { InputImagen } from "src/shared/componentes/InputImagen";
import { SelectIngredientesConCantidad } from "src/shared/componentes/SelectIngredientesConCantidad";

const estadoInicial: RecetaCrearDto = {
  nombre: "",
  pasos: [],
  foto: "",
  id_categoria: 0,
  id_pais: 0,
  ingredientes: [],
};

export default function RecetaCrearPage() {
  const [form, setForm] = useState<RecetaCrearDto>(estadoInicial);
  const navigate = useNavigate();
  const [imagenSeleccionada, setImagenSeleccionada] = useState<File | null>(null);

  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nombre", form.nombre);
      formData.append("id_pais", form.id_pais.toString());
      formData.append("id_categoria", form.id_categoria.toString());
      formData.append("pasos", JSON.stringify(form.pasos));
      formData.append("ingredientes", JSON.stringify(form.ingredientes));

      if (imagenSeleccionada) {
        formData.append("foto", imagenSeleccionada);
      }

      await RecetaService.crearReceta(formData);
      alert("Receta creada correctamente");
      navigate("/admin/recetas");
    } catch (error) {
      console.error("Error al crear receta", error);
      alert("Ocurrió un error al crear la receta");
    }
  }

  return (
    <>
    <Typography variant="h4" gutterBottom>
        Crear Receta
    </Typography>

    <Box sx={{ p: 3 }}>

      <form onSubmit={handleOnSubmit}>
        <Grid container columnSpacing={5} rowSpacing={5}>
          <Grid size={4}>
            <Typography variant="subtitle1" ><b><u>Información General</u></b></Typography>
            <Stack spacing={2} py={3}>
              <TextField
                label="Nombre"
                fullWidth
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />

              <SelectPais
                value={Number(form.id_pais)}
                onChange={(id) => setForm({ ...form, id_pais: id })}
              />

              <SelectCategoria
                value={Number(form.id_categoria)}
                onChange={(id) => setForm({ ...form, id_categoria: id })}
              />
            </Stack>
          </Grid>

          <Divider orientation="vertical" flexItem/>

          <Grid size={6}>
              <InputImagen
                label="Imagen de la receta"
                value={imagenSeleccionada}
                onChange={(file) => setImagenSeleccionada(file)}
              />
          </Grid>

          <Grid size={12}>
            <Divider />
          </Grid>

          <Grid size={4}>
              <SelectIngredientesConCantidad
                value={form.ingredientes}
                onChange={(nuevos) => setForm({ ...form, ingredientes: nuevos })}
              />

          </Grid>

          <Divider orientation="vertical" flexItem/>

          <Grid size={6}>
              <ListaPasos
                label="Pasos de la receta"
                value={form.pasos}
                onChange={(nuevos) => setForm({ ...form, pasos: nuevos })}
              />
          </Grid>

        </Grid>

        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "rgb(255, 255, 255)",
            py: 1,
            gap: 2,
            boxShadow: "0 -2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate("/admin/recetas")}
            sx={{ width: "50%", maxWidth: 320 }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "50%", maxWidth: 320 }}
          >
            Guardar Cambios
          </Button>
        </Box>
      </form>
    </Box>
  </>
  );
}

