import { Module } from '@nestjs/common';
import { RecetaIngredienteService } from './receta-ingrediente.service';
import { RecetaIngredienteController } from './receta-ingrediente.controller';

@Module({
  controllers: [RecetaIngredienteController],
  providers: [RecetaIngredienteService],
})
export class RecetaIngredienteModule {}
