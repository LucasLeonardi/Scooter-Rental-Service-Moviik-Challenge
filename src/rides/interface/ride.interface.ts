import { Ride } from "../entities/ride.entity"

export interface RideServiceInterface{
    create(): Promise<string>

    stopRide(rideId: number): Promise<string>

    getRideHistoryByScooter(scooterId: number): Promise<Ride[] | null>
}

export interface RideRepositoryInterface{
    createOrPatch(ride: Ride): Promise<Ride>

    getRide(rideId: number): Promise<Ride | null>

    getRidesByScooterId(scooterId: number): Promise<Ride[] | null>
}