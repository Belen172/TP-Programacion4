import { api } from "./nestAxios";

export type RecetasPorPais = {
  pais: string;
  cantidad: number;
};

export type RecetasPorCategoria = {
  categoria: string;
  cantidad: number;
};

export type IngredienteMasUsado = {
  ingrediente: string;
  cantidad: number;
};

// 👇 AGREGAR /api delante igual que en RecetaService
export async function getRecetasPorPais(): Promise<RecetasPorPais[]> {
  const res = await api.get("/api/estadisticas/recetas-por-pais");
  return res.data;
}

export async function getRecetasPorCategoria(): Promise<RecetasPorCategoria[]> {
  const res = await api.get("/api/estadisticas/recetas-por-categoria");
  return res.data;
}

export async function getIngredientesMasUsados(): Promise<IngredienteMasUsado[]> {
  const res = await api.get("/api/estadisticas/ingredientes-mas-usados");
  return res.data;
}

