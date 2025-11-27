import { AbsenceDetails } from "./absence-details";

export interface RestResponse<T> {
    result: T[];
    size: number;
    hasNext: boolean;
    type: string;
    status: string;
}