import { gql } from "../__generated__";

export const GET_APP_BY_PUBLIC_KEY = gql(`
  query GetAppByPublicKey($publicKey: String!) {
    getAppByPublicKey(publicKey: $publicKey) {
        appName
        gandalfID
    }
  }
`);

export const GET_SUPORTED_SERVICES = gql(`
  query GetSupportedServices {
    __type(name: "Source") {
      name
      enumValues(includeDeprecated: false) {
        name
      }
    }
  }
`);