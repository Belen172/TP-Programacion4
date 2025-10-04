import { Test, TestingModule } from '@nestjs/testing';
import { RecetaIngredienteService } from './receta-ingrediente.service';

describe('RecetaIngredienteService', () => {
  let service: RecetaIngredienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecetaIngredienteService],
    }).compile();

    service = module.get<RecetaIngredienteService>(RecetaIngredienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
