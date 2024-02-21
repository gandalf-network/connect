import { gql, GraphQLClient } from 'graphql-request';
import { WATSON_URL } from './constants';

export const gql_request = async (
  query: string,
  variables?: any
) => {
  const client = new GraphQLClient(WATSON_URL);
  const data = await client.request(query, variables);
  return data;
};

export const GET_APP_BY_PUBLIC_KEY = gql`
  query GetAppByPublicKey($publicKey: String!) {
    getAppByPublicKey(publicKey: $publicKey) {
        appName
        gandalfID
    }
  }
`;
