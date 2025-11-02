import { Module } from '@nestjs/common';
import { IngredienteService } from './ingrediente.service';
import { IngredienteController } from './ingrediente.controller';
import { Ingrediente } from '../ingrediente/entities/ingrediente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receta } from '../receta/entities/receta.entity';

@Module({
  controllers: [IngredienteController],
  providers: [IngredienteService],
  imports: [TypeOrmModule.forFeature([Ingrediente, Receta])],
})
export class IngredienteModule {}
