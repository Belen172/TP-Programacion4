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

export type RecetasPopulares = {
  nombreReceta : string;
  rating : number;
}

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

  //Actualizar rating favoritos
export async function actualizarRating(recetaId: number){
    try{
    await api.post(`/api/estadisticas/actualizarRating/${recetaId}`)
    }catch(error){
      console.log(error)
    }
    return;
  }

  //Recetas populares
  export async function getRecetasPopulares() : Promise<RecetasPopulares[]>{
    const res = await api.get(`/api/estadisticas/recetasPopulares`);
      return res.data;
  }

