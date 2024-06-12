import { GraphQLClient } from 'graphql-request';
import { GET_SUPORTED_SERVICES_AND_TRAITS } from './gql/queries';
import { WATSON_URL } from '../lib/constants';

export type SupportedServicesAndTraits = {
  services: string[];
  traits: string[];
  activities: string[];
};

export const getSupportedServicesAndTraits = async () => {
  const res: SupportedServicesAndTraits = {
    services: [],
    traits: [],
    activities: [],
  };

  try {
    const client = new GraphQLClient(WATSON_URL);
    const data = await client.request(GET_SUPORTED_SERVICES_AND_TRAITS);

    if (data.__sourceType?.enumValues) {
      for (const i of data.__sourceType.enumValues) {
        res.services = [...res.services, i.name.toLowerCase()];
      }
    }
    if (data.__traitType?.enumValues) {
      for (const i of data.__traitType.enumValues) {
        res.traits = [...res.traits, i.name.toLowerCase()];
      }
    }
    if (data.__activityType?.enumValues) {
      for (const i of data.__activityType.enumValues) {
        res.activities = [...res.activities, i.name.toLowerCase()];
      }
    }
    return res;
  } catch (error) {
    return res;
  }
};
