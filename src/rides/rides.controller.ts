import { Controller, Get, Inject, Param, Patch, Post} from '@nestjs/common';
import type { RideServiceInterface } from './interface/ride.interface';

@Controller('rides')
export class RidesController {
  constructor(
    @Inject('RideServiceInterface') private readonly rideService: RideServiceInterface
  ) {}

  @Post()
  async create() {
    return await this.rideService.create();
  }

  @Patch(':id/stop')
  async stop(@Param('id') id: number){
    return await this.rideService.stopRide(id)
  }

  @Get('history/scooter/:id')
  async history(@Param('id') id: number){
    return await this.rideService.getRideHistoryByScooter(id)
  }
}
