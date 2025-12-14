import { Scooter } from "../entities/scooter.entity"

export interface ScooterServiceInterface{
    create(): Promise<any>
}

export interface ScooterRepositoryInterface{
    reserve(): Promise<Scooter | null>

    createNew(scooter: Scooter): Promise<Scooter>
}