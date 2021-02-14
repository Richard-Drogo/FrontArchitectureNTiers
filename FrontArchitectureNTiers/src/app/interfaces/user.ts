import { Mobility } from './mobility';

export interface User {
    email: string;
    firstname: string;
    lastname: string;
    typeUser: string;
    mobilities: Array<Mobility>;
}
