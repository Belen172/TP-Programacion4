import { Module } from '@nestjs/common';
import { PaisService } from './pais.service';
import { PaisController } from './pais.controller';
import { Pais } from '../pais/entities/pais.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receta } from '../receta/entities/receta.entity';

@Module({
  controllers: [PaisController],
  providers: [PaisService],
  imports: [TypeOrmModule.forFeature([Pais, Receta])],
})
export class PaisModule {}
