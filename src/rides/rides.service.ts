import { Inject, Injectable } from '@nestjs/common';
import { Ride, RiderState } from './entities/ride.entity';
import { ScooterStatus } from 'src/scooters/entities/scooter.entity';
import { differenceInMinutes } from 'date-fns';
import type { ScooterServiceInterface } from 'src/scooters/interfaces/scooter.interface';
import type { RideRepositoryInterface, RideServiceInterface } from './interface/ride.interface';

@Injectable()
export class RidesService implements RideServiceInterface{

  constructor(
    @Inject('ScooterServiceInterface') private readonly scootersService: ScooterServiceInterface,
    @Inject('RideRepositoryInterface') private readonly rideRepository: RideRepositoryInterface
  ){}

  async create(): Promise<string> {
    const scooterAvalible = await this.scootersService.reserve();

    if(!scooterAvalible){
      return "No Scooters avaliable"
    }

    const rideStart = new Ride(scooterAvalible.id, 0, RiderState.START);

    const rideCreated = await this.rideRepository.createOrPatch(rideStart)

    return `Ride with Id ${rideCreated.id} and Scooter ${scooterAvalible.id} have been started`
  
  }

  async stopRide(rideId: number): Promise<string>{
    const ride = await this.rideRepository.getRide(rideId)

    if(!ride){
      return "Ride not found"
    }

    if(ride.ended){
      return "Ride already ended"
    }

    const now = new Date();
    const minutes = differenceInMinutes(ride.createdAt, now) * -1

    const rideCost = 100 + (50 * minutes)

    const stopedRide = new Ride(ride.scooterId, rideCost, RiderState.END)
    stopedRide.ended = true;
    ride.ended = true

    await this.rideRepository.createOrPatch(ride);
    await this.rideRepository.createOrPatch(stopedRide);

    const scooter = await this.scootersService.getScooter(ride.scooterId)

    if(!scooter){
      return "Scooter not found"
    }

    scooter.scooterStatus = ScooterStatus.AVAILABLE

    await this.scootersService.patchScooter(scooter);

    return `Ride ${ride.id} ended, Scooter ${scooter.id} is avaliable and the cost is ${rideCost/100}`
  }

  async getRideHistoryByScooter(scooterId: number): Promise<Ride[] | null>{
    const history = await this.rideRepository.getRidesByScooterId(scooterId);
    if(!history){
      return null
    }
    const historyAdjusted = history.map(item => ({
      ...item,
      totalValue: item.totalValue? item.totalValue / 100 : 0
    }));

    return historyAdjusted
  }
}
