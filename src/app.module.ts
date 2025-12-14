import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScootersModule } from './scooters/scooters.module';
import { Scooter } from './scooters/entities/scooter.entity';
import { RidesModule } from './rides/rides.module';
import { Ride } from './rides/entities/ride.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'challenge',
      entities: [
        Scooter,
        Ride
      ],
      synchronize: true,
    }),
    ScootersModule,
    RidesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
