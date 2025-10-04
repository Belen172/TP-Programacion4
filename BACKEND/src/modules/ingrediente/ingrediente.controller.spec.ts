import { Test, TestingModule } from '@nestjs/testing';
import { IngredienteController } from './ingrediente.controller';
import { IngredienteService } from './ingrediente.service';

describe('IngredienteController', () => {
  let controller: IngredienteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredienteController],
      providers: [IngredienteService],
    }).compile();

    controller = module.get<IngredienteController>(IngredienteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
