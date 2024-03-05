import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import Equipements from "./Equipements";

@Entity()
export default class Logements extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('simple-array')
    images: string[];
    @Column()
    secteur: string;
    @Column()
    description: string;
    @Column()
    tarif_bas: number;
    @Column()
    tarif_moyen: number;
    @Column()
    tarif_haut: number;
    @Column()
    m_carre: number;
    @Column()
    chambre: number;
    @Column()
    salle_de_bain: number;
    @Column()
    categorie: string;
    @Column()
    avis: string;
    @Column()
    type: string;
    @ManyToMany(() => Equipements)
    @JoinTable()
    equipements: string[];
}