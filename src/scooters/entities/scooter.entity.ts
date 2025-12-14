import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum ScooterStatus {
    AVAILABLE = "Available",
    OCCUPIED = "Occupied"
}

@Entity()
export class Scooter {

    @PrimaryGeneratedColumn()
    id: number

    @Column(
        ({
            type: "enum",
            enum: ScooterStatus,
            default: ScooterStatus.AVAILABLE,
        })
    )
    scooterStatus: ScooterStatus;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;
}
