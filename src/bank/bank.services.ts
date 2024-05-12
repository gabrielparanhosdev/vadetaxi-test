import { ResponseService, User } from "../types";
import { insertInTo, selectTable, updateTable } from "../utils";
import { BankAccount, GetBank, ResponseBank, UpdateBank, InsertBankAccount, DeleteBank } from "./bank.types";

const { v4: uuidv4 } = require('uuid');

export function createBank(props: InsertBankAccount): ResponseBank {
    const { payload } = props;
    const responseAuth = selectTable("auth");

    if (responseAuth && responseAuth?.user) {
        const user: User = responseAuth?.user;
        if (payload && payload?.bankName && payload?.bankAccountNumber && payload?.bankAccountAgency) {

            const bankInfo: [BankAccount] = selectTable("bankInfo") || [];
            if (user && bankInfo && bankInfo.length > 0) {
                const findBank = bankInfo.find((bank: BankAccount) => bank.userId == user.id);

                if (findBank) {
                    return {
                        data: "bank exist",
                        statusCode: 400
                    };
                }
            }

            const Response: BankAccount = {
                bankName: payload.bankName,
                bankAccountNumber: payload.bankAccountNumber,
                bankAccountAgency: payload.bankAccountAgency,
                bankId: uuidv4(),
                created: new Date().toISOString(),
                lastUpdate: new Date().toISOString(),
                userId: user.id
            };

            bankInfo.push(Response)
            insertInTo("bankInfo", bankInfo);

            return {
                statusCode: 200,
                data: Response
            }
        }
        return {
            data: "payload is invalid",
            statusCode: 400
        };
    }
    return {
        data: "bad request",
        statusCode: 400
    };


}

export function getBank(props: GetBank): ResponseBank {
    if (props.params?.bankId) {
        const bankInfo: [BankAccount] = selectTable("bankInfo");
        if (bankInfo && bankInfo.length > 0) {
            const findRide = bankInfo && bankInfo.length > 0 && bankInfo.find((bank: BankAccount) => bank.bankId == props.params.bankId);
            if (findRide) {
                return {
                    data: findRide,
                    statusCode: 200
                }
            }

            return {
                data: "not found",
                statusCode: 404
            }
        }
        return {
            data: "internal server error",
            statusCode: 500
        }
    }
    return {
        data: "payload or params is invalid",
        statusCode: 404
    }
}

export function updateBank(props: UpdateBank): ResponseBank {
    const { payload, params } = props;

    if (
        params &&
        params?.bankId &&
        payload && (
            payload.bankAccountAgency ||
            payload.bankAccountNumber ||
            payload.bankName
        )
    ) {
        const accounts = selectTable("bankInfo");
        if (accounts && accounts.length > 0) {
            const findAccount = accounts.find((bank: BankAccount) => bank.bankId == params.bankId);
            if (findAccount) {
                payload["lastUpdate"] = new Date().toISOString();

                const resUpdate = updateTable('bankInfo', payload, params, "userId");
                if (resUpdate) {
                    return {
                        data: resUpdate,
                        statusCode: 200
                    }
                } else {
                    return {
                        data: "error update",
                        statusCode: 500
                    };
                }
            }
            return {
                data: "not found",
                statusCode: 404
            };
        }
        return {
            data: "internal server error",
            statusCode: 500
        };
    }
    return {
        data: "payload is invalid",
        statusCode: 400
    };

}

export function deleteBank(props: DeleteBank): ResponseService {
    const { params, payload } = props;

    if (params?.bankId) {
        const banks = selectTable("bankInfo");

        if (banks) {
            const bank = banks.find((bank: BankAccount) => bank.bankId === params.bankId)
            const newBanks = banks.filter((bank: BankAccount) => bank.bankId !== params.bankId);

            if (newBanks.length > 0) {
                insertInTo('bankInfo', newBanks);

                if (payload && payload?.reason) {
                    const systemBanksInfo = selectTable("systemBanksInfo") || [];
                    systemBanksInfo.push({
                        userId: bank.userid,
                        reason: payload.reason
                    })

                    insertInTo("systemBanksInfo", systemBanksInfo)
                }

                return {
                    data: "no content",
                    statusCode: 201
                }
            } else {
                return {
                    data: "internal error",
                    statusCode: 500
                }
            }
        }
        return {
            data: "Banks Not found",
            statusCode: 404
        }
    }
    return {
        data: "bad request",
        statusCode: 400
    }
}