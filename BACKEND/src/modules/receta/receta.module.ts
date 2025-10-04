import { Module } from '@nestjs/common';
import { RecetaService } from './receta.service';
import { RecetaController } from './receta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receta } from './entities/receta.entity';
import { Categoria } from '../categoria/entities/categoria.entity';
import { Pais } from '../pais/entities/pais.entity';
import { In } from 'typeorm';
import { Ingrediente } from '../ingrediente/entities/ingrediente.entity';
import { RecetaIngrediente } from '../receta-ingrediente/entities/receta-ingrediente.entity';

@Module({
  controllers: [RecetaController],
  providers: [RecetaService],
  imports: [TypeOrmModule.forFeature([Receta, Categoria, Pais, Ingrediente, RecetaIngrediente])],
})
export class RecetaModule {}
