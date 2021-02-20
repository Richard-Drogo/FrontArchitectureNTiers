import { User } from './user';

export interface Mobility {
    id: number;
    city: string;
    country: string;
    beginDate: string;
    endDate: string;
    submissionDate: string;
    student: User;
}
