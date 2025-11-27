import { Justification } from "./justification";

export interface AbsenceDetails {
    idAbsence: string;
    nom: string;
    prenom: string;
    dateNaissance: string;
    matricule: string;
    classe: string;
    dateAbsence: string;
    cours: string;
    etatAbsence: string;
    horaire: string;
    justification: Justification | null;
}