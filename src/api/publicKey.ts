import { GraphQLClient } from "graphql-request";
import { GET_APP_BY_PUBLIC_KEY } from "./gql/queries";
import { WATSON_URL } from "../lib/constants";
import { GetAppByPublicKeyQueryVariables } from "./__generated__/graphql";

export const verifyPublicKey = async (variables: GetAppByPublicKeyQueryVariables): Promise<boolean> => {
    try {
        const client = new GraphQLClient(WATSON_URL);
        const data = await client.request(GET_APP_BY_PUBLIC_KEY, variables);

        return data.getAppByPublicKey.gandalfID > 0
    } catch (error) {
        return false
    }
}