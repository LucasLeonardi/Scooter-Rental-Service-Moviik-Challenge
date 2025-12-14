import { Controller, Post, Inject } from '@nestjs/common';
import type { ScooterServiceInterface } from './interfaces/scooter.interface';

@Controller('scooters')
export class ScootersController {
  constructor(
    @Inject('ScooterServiceInterface') private readonly scootersService: ScooterServiceInterface
  ){}

  @Post()
  async create() {
    return await this.scootersService.create();
  }

}
