import { User } from './user';

export interface Mobility {
    city: string;
    country: string;
    beginDate: string;
    endDate: string;
    student: User;
}
