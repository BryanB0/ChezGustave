import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Logements from "./Logements";
import Users from "./Users";
import Ratings from "./Ratings";
@Entity()
export default class Reservations extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    start_date: Date;
    @Column()
    end_date: Date;
    @Column()
    chef_cuisine: boolean;
    @Column()
    visite: Date;
    @OneToOne(() => Logements)
    @JoinColumn()
    logement: Logements;
    @OneToOne(() => Users)
    @JoinColumn()
    user: Users;
    @OneToOne(() => Ratings)
    @JoinColumn()
    rating: Ratings;
}