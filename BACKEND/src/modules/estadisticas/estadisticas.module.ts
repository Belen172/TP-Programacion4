import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadisticasService } from './estadisticas.service';
import { EstadisticasController } from './estadisticas.controller';
import { Receta } from '../receta/entities/receta.entity';
import { Pais } from '../pais/entities/pais.entity';
import { Categoria } from '../categoria/entities/categoria.entity';
import { RecetaIngrediente } from '../receta/entities/receta_ingrediente';
import { Ingrediente } from '../ingrediente/entities/ingrediente.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Receta,
      Pais,
      Categoria,
      RecetaIngrediente,
      Ingrediente,
    ]),
  ],
  controllers: [EstadisticasController],
  providers: [EstadisticasService],
})
export class EstadisticasModule {}
