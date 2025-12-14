import { Module } from '@nestjs/common';
import { ScootersService } from './scooters.service';
import { ScootersController } from './scooters.controller';
import { ScootersRepository } from './scooters.repository';
import { Scooter } from './entities/scooter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Scooter])],
  controllers: [ScootersController],
  providers: [
    {
      provide: 'ScooterServiceInterface',
      useClass: ScootersService
    }, 
    {
      provide: 'ScooterRepositoryInterface',
      useClass: ScootersRepository
    }, 
  ],
})
export class ScootersModule {}
