import { Injectable } from '@nestjs/common';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receta } from './entities/receta.entity';

@Injectable()
export class RecetaService {


  constructor(
    @InjectRepository(Receta)
    private readonly recetaRepository: Repository<Receta>,
  ) { }

  create(createRecetaDto: CreateRecetaDto) {
    const nuevaReceta = this.recetaRepository.create(
      {
        nombre: createRecetaDto.nombre,
        pasos: createRecetaDto.pasos,
        foto: createRecetaDto.foto,
        categoria: { id_categoria: createRecetaDto.id_categoria } as any,
        pais: { id_pais: createRecetaDto.id_pais } as any
      }
    );
    return this.recetaRepository.save(nuevaReceta);
  }

  findAll(): Promise<Receta[]> {
    return this.recetaRepository.find({ relations: ['pais', 'categoria'] });
  }
}
