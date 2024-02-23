import { GraphQLClient } from "graphql-request";
import { GET_SUPORTED_SERVICES } from "./gql/queries";
import { WATSON_URL } from "../lib/constants";

export const getSupportedServices = async (): Promise<string[]> => {
    let services: string[] = []
    try {
        const client = new GraphQLClient(WATSON_URL);
        const data = await client.request(GET_SUPORTED_SERVICES);

        if (data.__type?.enumValues) {
            for (let i of data.__type.enumValues) {
                services = [...services, i.name.toLowerCase()]
            }
        }
        return services
    } catch (error) {
        return services
    }
}