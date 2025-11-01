import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Receta } from './entities/receta.entity';
import { Ingrediente } from '../ingrediente/entities/ingrediente.entity';

@Injectable()
export class RecetaService {

  constructor(
    @InjectRepository(Receta)
    private readonly recetaRepository: Repository<Receta>,
 
    @InjectRepository(Ingrediente)
    private readonly ingredienteRepository: Repository<Ingrediente>,
  ) {}

  async create(createRecetaDto: CreateRecetaDto) {
    // Extraemos los campos del DTO
    const { nombre, pasos, foto, id_categoria, id_pais, ingredientes } = createRecetaDto;

    // 1️⃣ Creamos la receta base
    const nuevaReceta = this.recetaRepository.create({
      nombre,
      pasos,
      foto,
      categoria: { id_categoria } as any,
      pais: { id_pais } as any,
    });

    // 2️⃣ Si vienen ingredientes, los buscamos en la base de datos
    if (ingredientes && ingredientes.length > 0) {
      const ingredientesEncontrados = await this.ingredienteRepository.findBy({
        id_ingrediente: In(ingredientes),
      });
      nuevaReceta.ingredientes = ingredientesEncontrados;
    }

    // 3️⃣ Guardamos la receta junto con sus relaciones
    return this.recetaRepository.save(nuevaReceta);

  }

  findAll(): Promise<Receta[]> {
    return this.recetaRepository.find({
      relations: ['pais', 'categoria', 'ingredientes'],
    });
  }

    findOne(id_receta: number) {
    return this.recetaRepository.findOne({where:{id_receta}})
  }

  async update(id_receta: number, updateRecetaDTO: UpdateRecetaDto): Promise<Receta> {

    const recetaExistente = await this.recetaRepository.findOne({where: {id_receta}});
    
    if(!recetaExistente){
      throw new NotFoundException("Receta no encontrada");
    }

  let ingredientes;
  if (updateRecetaDTO.ingredientes) {
    ingredientes = updateRecetaDTO.ingredientes.map(id => ({ id_ingrediente: id }));
  }

  const updated = this.recetaRepository.merge(recetaExistente, {
    ...updateRecetaDTO,
    ...(ingredientes && { ingredientes }),
  });

  return await this.recetaRepository.save(updated);

  }


}
