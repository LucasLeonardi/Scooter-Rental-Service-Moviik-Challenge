import { Module } from '@nestjs/common';
import { RidesService } from './rides.service';
import { RidesController } from './rides.controller';
import { Ride } from './entities/ride.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScootersModule } from 'src/scooters/scooters.module';
import { RidesRepository } from './riders.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ride]),
    ScootersModule
  ],
  controllers: [RidesController],
  providers: [
    {
      provide: 'RideServiceInterface',
      useClass: RidesService
    },
    {
      provide: 'RideRepositoryInterface',
      useClass: RidesRepository
    }, 
  ],
})
export class RidesModule {}
