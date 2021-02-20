import { Mobility } from './mobility';

export interface User {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    typeUser: string;
    mobilities: Array<Mobility>;
}
