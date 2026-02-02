import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receta } from './entities/receta.entity';
import { Ingrediente } from '../ingrediente/entities/ingrediente.entity';
import { RecetaIngrediente } from './entities/receta_ingrediente';
import { Rating } from '../estadisticas/entities/rating.entity';

@Injectable()
export class RecetaService {
  constructor(
    @InjectRepository(Receta)
    private readonly recetaRepository: Repository<Receta>,

    @InjectRepository(Ingrediente)
    private readonly ingredienteRepository: Repository<Ingrediente>,

    @InjectRepository(RecetaIngrediente)
    private readonly recetaIngredienteRepository: Repository<RecetaIngrediente>,

   @InjectRepository(Rating)
   private readonly ratingRepository: Repository<Rating> 

  ) {}

  // Crear una nueva receta con ingredientes + cantidad
  async create(createRecetaDto: any) {
    const receta = this.recetaRepository.create({
      nombre: createRecetaDto.nombre,
      pasos: createRecetaDto.pasos,
      foto: createRecetaDto.foto,
      categoria: { id_categoria: createRecetaDto.id_categoria } as any,
      pais: { id_pais: createRecetaDto.id_pais } as any,
    });

    // Guardamos primero la receta para tener su ID
    const recetaGuardada = await this.recetaRepository.save(receta);

    // 💡 Luego creamos las relaciones con los ingredientes
    const recetaIngredientes = createRecetaDto.ingredientes.map((ing) =>
      this.recetaIngredienteRepository.create({
        receta: recetaGuardada,
        ingrediente: { id_ingrediente: ing.id_ingrediente },
        cantidad: ing.cantidad,
      }),
    );

    // Guardamos los vínculos en la tabla intermedia
    await this.recetaIngredienteRepository.save(recetaIngredientes);

    //Inicializamos Rating:
    const rating = this.ratingRepository.create({
      recetaId: recetaGuardada.id_receta,
      nombreReceta: recetaGuardada.nombre,
      rating: 0,
    })

    await this.ratingRepository.save(rating);

    // Devolvemos la receta completa con sus ingredientes
    return await this.recetaRepository.findOne({
      where: { id_receta: recetaGuardada.id_receta },
      relations: ['recetaIngredientes', 'categoria', 'pais'],
    });



  }


  async findAll() {
    // Traemos todas las recetas con sus relaciones
    const recetas = await this.recetaRepository.find({
      relations: [
        'categoria',
        'pais',
        'recetaIngredientes',
        'recetaIngredientes.ingrediente',
      ],
    });

    // Transformamos cada receta para incluir los ingredientes
    return recetas.map((receta) => {
      const ingredientes = receta.recetaIngredientes.map((ri) => ({
        id_ingrediente: ri.ingrediente.id_ingrediente,
        nombre: ri.ingrediente.nombre,
        unidad_medida: ri.ingrediente.unidad_medida,
        cantidad: ri.cantidad,
      }));

      return { ...receta, ingredientes };
    });
  } 


  async findOne(id: number) {
    // Buscamos la receta con todas las relaciones
    const receta = await this.recetaRepository.findOne({
      where: { id_receta: id },
      relations: [
        'categoria',
        'pais',
        'recetaIngredientes',
        'recetaIngredientes.ingrediente',
      ],
    });

    if (!receta) throw new NotFoundException('Receta no encontrada');

    // Convertimos recetaIngredientes al formato que espera el front
    const ingredientes = receta.recetaIngredientes.map((ri) => ({
      id_ingrediente: ri.ingrediente.id_ingrediente,
      nombre: ri.ingrediente.nombre,
      unidad_medida: ri.ingrediente.unidad_medida,
      cantidad: ri.cantidad,
    }));

    // Devolvemos la receta con los ingredientes listos para mostrar
    return { ...receta, ingredientes };
  } 


  // Actualizar una receta existente con ingredientes + cantidad
  async update(id_receta: number, updateRecetaDto: any) {
    const receta = await this.recetaRepository.findOne({
      where: { id_receta: id_receta },
      relations: ['recetaIngredientes'],
    });

    if (!receta) {
      throw new NotFoundException(`Receta con id ${id_receta} no encontrada`);
    }

    // Actualizamos los campos básicos
    receta.nombre = updateRecetaDto.nombre;
    receta.pasos = updateRecetaDto.pasos;
    receta.foto = updateRecetaDto.foto;
    receta.categoria = { id_categoria: updateRecetaDto.id_categoria } as any;
    receta.pais = { id_pais: updateRecetaDto.id_pais } as any;

    // Primero borramos los ingredientes anteriores
    await this.recetaIngredienteRepository.delete({ receta: { id_receta: id_receta } });

    // Ahora recreamos los nuevos ingredientes recibidos
    const nuevosIngredientes = updateRecetaDto.ingredientes.map((ing) =>
      this.recetaIngredienteRepository.create({
        receta,
        ingrediente: { id_ingrediente: ing.id_ingrediente },
        cantidad: ing.cantidad,
      }),
    );

    receta.recetaIngredientes = nuevosIngredientes;

    // Guardamos todo
    return await this.recetaRepository.save(receta);
  }


  async remove(id_receta: number){

    await this.recetaRepository.delete({id_receta});
    
  }

}

