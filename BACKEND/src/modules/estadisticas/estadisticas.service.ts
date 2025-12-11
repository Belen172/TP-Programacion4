import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Receta } from '../receta/entities/receta.entity';
import { RecetaIngrediente } from '../receta/entities/receta_ingrediente';
import { Repository } from 'typeorm';

@Injectable()
export class EstadisticasService {
  constructor(
    @InjectRepository(Receta)
    private readonly recetaRepository: Repository<Receta>,

    @InjectRepository(RecetaIngrediente)
    private readonly recetaIngredienteRepository: Repository<RecetaIngrediente>,
  ) {}

  // 1) Recetas por país
  async recetasPorPais() {
    return this.recetaRepository
      .createQueryBuilder('r')
      .leftJoin('r.pais', 'p')
      .select('p.nombre', 'pais')
      .addSelect('COUNT(r.id_receta)', 'cantidad')
      .groupBy('p.nombre')
      .getRawMany();
  }

  // 2) Recetas por categoría
  async recetasPorCategoria() {
    return this.recetaRepository
      .createQueryBuilder('r')
      .leftJoin('r.categoria', 'c')
      .select('c.nombre', 'categoria')
      .addSelect('COUNT(r.id_receta)', 'cantidad')
      .groupBy('c.nombre')
      .getRawMany();
  }

  // 3) Ingredientes más usados (Top 5)
  async ingredientesMasUsados() {
    return this.recetaIngredienteRepository
      .createQueryBuilder('ri')
      .leftJoin('ri.ingrediente', 'i')
      .select('i.nombre', 'ingrediente')
      .addSelect('COUNT(*)', 'cantidad')
      .groupBy('i.nombre')
      .orderBy('cantidad', 'DESC')
      .limit(5)
      .getRawMany();
  }
}

