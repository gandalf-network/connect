import { gql } from '../__generated__';

export const GET_APP_BY_PUBLIC_KEY = gql(`
  query GetAppByPublicKey($publicKey: String!) {
    getAppByPublicKey(publicKey: $publicKey) {
        appName
        gandalfID
    }
  }
`);

export const GET_SUPORTED_SERVICES_AND_TRAITS = gql(`
  query GetSupportedServices {
    __sourceType: __type(name: "Source") {
      name
      enumValues(includeDeprecated: false) {
        name
      }
    }
    __traitType: __type(name: "TraitLabel") {
      name
      enumValues(includeDeprecated: false) {
        name
      }
    }
    __activityType: __type(name: "ActivityType") {
      name
      enumValues(includeDeprecated: false) {
        name
      }
    }
  }
`);
