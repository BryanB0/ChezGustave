import { DataSource } from 'typeorm';
import { ExampleEntity } from './entities/ExampleEntity';
import Equipements from './entities/Equipements';
import  Logements  from './entities/Logements';
import  Ratings  from './entities/Ratings';
import  Reservations  from './entities/Reservations';
import  Users  from './entities/Users';

export default new DataSource({
    type: 'postgres',
    url: process.env['DATABASE_URL'],
    synchronize: true,
    logging: true,
    entities: [
        ExampleEntity,
        Equipements,
        Logements,
        Ratings,
        Reservations,
        Users
    ]
});