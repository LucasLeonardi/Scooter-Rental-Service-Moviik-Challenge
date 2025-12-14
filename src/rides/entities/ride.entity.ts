import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum RiderState {
    START = "start",
    END = "End"
}

@Entity()
export class Ride {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    scooterId: number;

    @Column({
        default: 0
    })
    totalValue: number;

    @Column(
        ({
            type: "enum",
            enum: RiderState,
            default: RiderState.START,
        })
    )
    state: RiderState;

    @Column({
        default: false
    })
    ended: boolean

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;
    
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    constructor(scootedId: number, totalValue: number, state: RiderState){
        this.scooterId = scootedId
        this.totalValue = totalValue
        this.state = state
    }
}
