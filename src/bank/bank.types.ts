interface BankRequest {
    bankName?: string,
    bankAccountNumber?: string,
    bankAccountAgency?: string,
    lastUpdate?: string,

}

interface BankById {
    bankId: string
}

interface InsertBankAccount {
    payload: BankRequest
}

interface GetBank {
    params: BankById
}

interface UpdateBank {
    params: BankById;
    payload: BankRequest
}

interface DeleteBank {
    params:BankById
    payload: {
        reason?: string
    }
}

interface BankAccount {
    bankName: string,
    bankAccountNumber: string,
    bankAccountAgency: string,
    bankId: string,
    created: string,
    lastUpdate: string,
    userId: string
}

interface ResponseBank {
    statusCode: number;
    data?: BankAccount | string;
    error?: string;
}

export { 
    InsertBankAccount, 
    BankAccount, 
    GetBank, 
    ResponseBank, 
    UpdateBank, 
    DeleteBank 
}