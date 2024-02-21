import { GET_APP_BY_PUBLIC_KEY, gql_request } from "../lib/request"

export const verifyPublicKey = async (publicKey: string): Promise<boolean> => {
    try {
        const variables = {publicKey};
        const data: any = await gql_request(GET_APP_BY_PUBLIC_KEY, variables);
        return data.getAppByPublicKey.gandalfID > 0;
    } catch (error) {
        return false
    }
}