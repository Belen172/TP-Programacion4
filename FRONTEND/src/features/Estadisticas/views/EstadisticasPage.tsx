import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import {
  getRecetasPorPais,
  getRecetasPorCategoria,
  getIngredientesMasUsados,
  getRecetasPopulares,
  type RecetasPorPais,
  type RecetasPorCategoria,
  type IngredienteMasUsado,
  type RecetasPopulares,
} from "../../../shared/libs/estadisticas.service";

import { RecetasPorPais as CompPais } from "../componentes/RecetasPorPais";
import { RecetasPorCategoria as CompCategoria } from "../componentes/RecetasPorCategoria";
import { IngredientesMasUsados as CompIngredientes } from "../componentes/IngredientesMasUsados";
import { RecetasPopularesGraph} from "../componentes/RecetasPopularesGraph";

export default function EstadisticasPage() {
  const [porPais, setPorPais] = useState<RecetasPorPais[]>([]);
  const [porCategoria, setPorCategoria] = useState<RecetasPorCategoria[]>([]);
  const [topIngredientes, setTopIngredientes] = useState<IngredienteMasUsado[]>([]);
  const [totalRecetas, setTotalRecetas] = useState<number>(0);
  const [recetasPopulares, setRecetasPopulares] = useState<RecetasPopulares[]>([]);
  

  useEffect(() => {
    const cargar = async () => {
      try {
        const [paises, categorias, ingredientes, recetasPopulares] = await Promise.all([
          getRecetasPorPais(),
          getRecetasPorCategoria(),
          getIngredientesMasUsados(),
          getRecetasPopulares(),
          getRecetasPopulares()
        ]);

        setPorPais(paises);
        setPorCategoria(categorias);
        setTopIngredientes(ingredientes);
        setRecetasPopulares(recetasPopulares);

        const total = paises.reduce(
          (acc, item) => acc + Number(item.cantidad),
          0
        );
        setTotalRecetas(total);

      } catch (error) {
        console.error("Error cargando estadísticas", error);
      }
    };

    cargar();
  }, []);

  const handleImprimir = () => {
    window.print();
  };

  return (
    <Box p={2}>
      
      {/* ENCABEZADO (oculto en impresión) */}
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className="no-print"
      >
        <Typography variant="h5" fontWeight="bold">
          Estadísticas de RecetApp
        </Typography>
        <Button variant="contained" onClick={handleImprimir}>
          Imprimir / Generar reporte
        </Button>
      </Box>

      {/* CONTENIDO DEL REPORTE */}
      <Box>
        <Box mb={3}>
          <Typography variant="h5" fontWeight="bold">
            Reporte de estadísticas de recetas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Generado el {new Date().toLocaleString()}
          </Typography>
        </Box>

        {/* RESUMEN GENERAL */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Este reporte presenta un resumen de la información registrada en el sistema,
              incluyendo la cantidad total de recetas, los países de origen más frecuentes,
              las categorías más utilizadas y los ingredientes con mayor presencia.
            </Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>
              En total, el sistema cuenta actualmente con <strong>{totalRecetas}</strong>{" "}
              recetas registradas. Los gráficos a continuación ofrecen una comparación visual
              de cómo se distribuyen según país, categoría y uso de ingredientes.
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Este apartado busca ofrecer una visión clara y rápida del estado general de las
              recetas cargadas en la plataforma.
            </Typography>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          <Grid container>
          <Grid container spacing={2} size={{xs:12, md:6}}>
          {/* GRÁFICO  - Recetas populares */}
            <Grid size={{xs:12, md:12}}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recetas Populares (Top 3)
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <RecetasPopularesGraph
                  data={recetasPopulares.map((rp) => ({
                    label: rp.nombreReceta,
                    value: rp.rating
                  }))}
                />
              </CardContent>
            </Card>
          </Grid>
          {/* GRÁFICO 1 - Recetas por país (BARRAS VERTICALES) */}
            <Grid size={{xs:12, md:12}}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recetas por país
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <CompPais
                  data={porPais.map((p) => ({
                    label: p.pais,
                    value: Number(p.cantidad),
                  }))}
                />
              </CardContent>
            </Card>
            </Grid>

          </Grid>

          {/* GRÁFICO 2 - Recetas por categoría (DONUT) */}
          
          <Grid size={{xs:12, md:6}} >
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recetas por categoría
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <CompCategoria
                  data={porCategoria.map((c) => ({
                    label: c.categoria,
                    value: Number(c.cantidad),
                  }))}
                />
              </CardContent>
            </Card>
          </Grid>
          </Grid>


          {/* GRÁFICO 3 - Ingredientes más usados (BARRAS HORIZONTALES) */}
          <Grid size={{xs:12}}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Ingredientes más usados (Top 5)
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <CompIngredientes
                  data={topIngredientes.map((i) => ({
                    label: i.ingrediente,
                    value: Number(i.cantidad),
                  }))}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}