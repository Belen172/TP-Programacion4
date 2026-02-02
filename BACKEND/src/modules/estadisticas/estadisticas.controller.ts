import { Controller, Get, Param, Post } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';

@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {}

  @Get('recetas-por-pais')
  recetasPorPais() {
    return this.estadisticasService.recetasPorPais();
  }

  @Get('recetas-por-categoria')
  recetasPorCategoria() {
    return this.estadisticasService.recetasPorCategoria();
  }

  @Get('ingredientes-mas-usados')
  ingredientesMasUsados() {
    return this.estadisticasService.ingredientesMasUsados();
  }

   @Post('actualizarRating/:recetaId')
  actualizarRating(@Param('recetaId') recetaId: number){
  try{
  this.estadisticasService.actualizarRating(recetaId)
  }
  catch(error){
    console.log(error);
  }
  }

  @Get('recetasPopulares')
  recetasPopulares(){
    return this.estadisticasService.recetasPopulares();
  }
} 
