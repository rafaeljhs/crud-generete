export class Student {
    id: string;
    name: string;
    issuerId: string;
    birthDate: Date;
    rg: string;
    cpf: string;
    institutionCourseId: string;
    currentTerm: Number;
    maxTerms: Number;
    status: StudentStatus;
    periodId: string;
    period: string;
    cardCode: string;
    cep: string;
    address: string;
    neighborhood: string;
    city: string;
    stateUF: string;
    phone: string;
    login: string;
    password: string;
    photoURL: string;

    institutionName: string;
    courseName: string;
    reason: string;

}

export enum StudentStatus {
    Pending = 1,
    Rejected = 2,
    Approved = 3,
    Expired = 4
}