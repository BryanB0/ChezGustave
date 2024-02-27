import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    name: string;
    @Column()
    tel: string;
    @Column()
    password: string;
    @Column()
    is_admin: boolean;
}