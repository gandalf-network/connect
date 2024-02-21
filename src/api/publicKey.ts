import { GraphQLClient } from "graphql-request";
import { GET_APP_BY_PUBLIC_KEY } from "./gql/publicKey";
import { WATSON_URL } from "../lib/constants";

export const verifyPublicKey = async (publicKey: string): Promise<boolean> => {
    try {
        const variables = {publicKey};
        const client = new GraphQLClient(WATSON_URL);
        const data = await client.request(GET_APP_BY_PUBLIC_KEY, variables);
        return data.getAppByPublicKey.gandalfID > 0;
    } catch (error) {
        return false
    }
}