import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Ride, RiderState } from "./entities/ride.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { RideRepositoryInterface } from "./interface/ride.interface";

@Injectable()
export class RidesRepository extends Repository<Ride> implements RideRepositoryInterface{
    constructor(@InjectRepository(Ride) private rideRepo: Repository<Ride>) {
        super(rideRepo.target, rideRepo.manager, rideRepo.queryRunner)
    }

    async createOrPatch(ride: Ride): Promise<Ride>{
        return await this.rideRepo.save(ride)
    }

    async getRide(rideId: number): Promise<Ride | null>{
        return await this.rideRepo.findOne({
            where: {
                id: rideId,
                state: RiderState.START
            }
        })
    }

    async getRidesByScooterId(scooterId: number): Promise<Ride[] | null>{
        return await this.rideRepo.find({
            where: {
                scooterId
            },
            order: {
                createdAt: "DESC"
            }
        })
    }
}