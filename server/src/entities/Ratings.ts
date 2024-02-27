import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import Logements from "./Logements";
import Users from "./Users";
import Reservations from "./Reservations";
@Entity()
export default class Ratings extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    rated: number;
    @Column()
    text: string;
    @OneToOne(() => Logements)
    @JoinColumn()
    logement: Logements;
    @OneToOne(() => Reservations)
    @JoinColumn()
    reservation: Reservations;
    @OneToOne(() => Users)
    @JoinColumn()
    user: Users;
}