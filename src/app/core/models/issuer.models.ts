export class Issuer {
    Id: string;
    CompanyName: string;
    TradeName: string;
    CNPJ: string;
    Email: string;
    Phone: string;
    Address: string;
    Neighborhood: string;
    CEP: string;
    City: string;
    StateUF: string;
    CardPrice: number;
    DeactivationDate: Date;
    Login: string;
    Password: string;
    BankName: string;
    BankAccount: string;
    BankBranch: string;
    BankAccountHolder: string;
    BankMovement: string;
    Files: {
        AdditionalText: string,
        Code: string,
        URL: string,
    }[];
}

