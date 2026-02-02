import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaService } from './receta.service';
import { RecetaController } from './receta.controller';
import { Receta } from './entities/receta.entity';
import { Ingrediente } from '../ingrediente/entities/ingrediente.entity';
import { RecetaIngrediente } from './entities/receta_ingrediente';
import { Rating } from '../estadisticas/entities/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receta, Ingrediente, RecetaIngrediente, Rating])],
  controllers: [RecetaController],
  providers: [RecetaService],
})
export class RecetaModule {}

