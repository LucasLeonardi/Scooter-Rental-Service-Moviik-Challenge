import { Scooter } from "../entities/scooter.entity"

export interface ScooterServiceInterface{
    create(): Promise<string>

    reserve(): Promise<Scooter | null>

    getScooter(scooterId: number): Promise<Scooter | null>

    patchScooter(scooter: Scooter): Promise<Scooter>
}

export interface ScooterRepositoryInterface{
    reserve(): Promise<Scooter | null>

    createOrPatch(scooter: Scooter): Promise<Scooter>

    getScooter(scooterId: number): Promise<Scooter | null>
}