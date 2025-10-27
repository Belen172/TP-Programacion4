import { Module } from '@nestjs/common';
import { PaisService } from './pais.service';
import { PaisController } from './pais.controller';
import { Pais } from '../pais/entities/pais.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PaisController],
  providers: [PaisService],
  imports: [TypeOrmModule.forFeature([Pais])],
})
export class PaisModule {}
