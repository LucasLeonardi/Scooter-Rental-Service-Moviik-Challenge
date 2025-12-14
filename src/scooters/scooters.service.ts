import { Inject, Injectable } from '@nestjs/common';
import type { ScooterRepositoryInterface, ScooterServiceInterface } from './interfaces/scooter.interface';
import { Scooter } from './entities/scooter.entity';

@Injectable()
export class ScootersService implements ScooterServiceInterface {
  constructor(
    @Inject('ScooterRepositoryInterface') private readonly scooterRepository: ScooterRepositoryInterface
  ){}
  
  async create(): Promise<string> {
    const scooter = new Scooter()
    const savedScooter = await this.scooterRepository.createOrPatch(scooter)
    return `Scooter with Id ${savedScooter.id} created with success`
  }

  async reserve(): Promise<Scooter | null>{
    return await this.scooterRepository.reserve()
  }

  async getScooter(scooterId: number): Promise<Scooter | null>{
    return await this.scooterRepository.getScooter(scooterId);
  }

  async patchScooter(scooter: Scooter): Promise<Scooter>{
    return await this.scooterRepository.createOrPatch(scooter);
  }
}
