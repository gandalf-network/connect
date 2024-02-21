import { gql } from "../__generated__";

export const GET_APP_BY_PUBLIC_KEY = gql(`
  query GetAppByPublicKey($publicKey: String!) {
    getAppByPublicKey(publicKey: $publicKey) {
        appName
        gandalfID
    }
  }
`);