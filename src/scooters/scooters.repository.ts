import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Scooter, ScooterStatus } from "./entities/scooter.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ScooterRepositoryInterface } from "./interfaces/scooter.interface";

@Injectable()
export class ScootersRepository extends Repository<Scooter> implements ScooterRepositoryInterface{
    constructor(@InjectRepository(Scooter) private scooterRepo: Repository<Scooter>) {
        super(scooterRepo.target, scooterRepo.manager, scooterRepo.queryRunner)
    }

    async reserve(): Promise<Scooter | null>{
        const queryRunner = await this.manager.connection.createQueryRunner();
        await queryRunner.connect();
        try {
            const manager = queryRunner.manager;
            await queryRunner.startTransaction();
            const scooter = await manager.findOne(Scooter, {
                where: {
                    scooterStatus: ScooterStatus.AVAILABLE
                },
                lock: { mode: 'pessimistic_write' },
            });

            if(!scooter){
                await queryRunner.release();
                return null
            }

            scooter.scooterStatus = ScooterStatus.OCCUPIED

            const scooterUpdate = await manager.save(Scooter, scooter)

            await queryRunner.release();
            return scooterUpdate
        } catch {
            await queryRunner.release();
            return null
        }
    }

    async getScooter(scooterId: number): Promise<Scooter | null>{
        return await this.scooterRepo.findOne({
            where: {
                id: scooterId
            }
        })
    }

    async createOrPatch(scooter: Scooter): Promise<Scooter>{
        const saved = await this.scooterRepo.save(scooter)
        return saved;
    }

}