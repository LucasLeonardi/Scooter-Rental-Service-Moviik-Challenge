import { Inject, Injectable } from '@nestjs/common';
import type { ScooterRepositoryInterface, ScooterServiceInterface } from './interfaces/scooter.interface';
import { Scooter } from './entities/scooter.entity';

@Injectable()
export class ScootersService implements ScooterServiceInterface {
  constructor(
    @Inject('ScooterRepositoryInterface') private readonly scooterRepository: ScooterRepositoryInterface
  ){}
  
  async create() {
    const scooter = new Scooter()
    const savedScooter = await this.scooterRepository.createNew(scooter)
    return `Scooter with Id ${savedScooter.id} created with success`
  }
}
