import { Test, TestingModule } from '@nestjs/testing';
import { RecetaIngredienteController } from './receta-ingrediente.controller';
import { RecetaIngredienteService } from './receta-ingrediente.service';

describe('RecetaIngredienteController', () => {
  let controller: RecetaIngredienteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecetaIngredienteController],
      providers: [RecetaIngredienteService],
    }).compile();

    controller = module.get<RecetaIngredienteController>(RecetaIngredienteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
