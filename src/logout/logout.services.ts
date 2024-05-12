import { insertInTo } from "../utils";
import { clearCache } from "../utils/fake-db";

export async function logout(){
    clearCache();
    return true;
}