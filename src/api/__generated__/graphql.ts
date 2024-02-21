/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Scalar type representing a 64-bit signed integer. */
  Int64: { input: any; output: any; }
  JSON: { input: any; output: any; }
  /** Scalar type representing a map data structure. */
  Map: { input: any; output: any; }
  /** Scalar type representing a specific point in time. */
  Time: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type Activity = {
  __typename?: 'Activity';
  /** Unique identifier for the activity. */
  id: Scalars['String']['output'];
  /** Metadata associated with the activity. */
  metadata: ActivityMetadata;
};

/** Represents an activity with source and data. */
export type ActivityInput = {
  /** The data associated with the activity. */
  data: Scalars['String']['input'];
  /** The source of the activity. */
  source: Source;
};

export type ActivityMetadata = NetflixActivityMetadata;

/** Type representing a registered application. */
export type Application = {
  __typename?: 'Application';
  appName: Scalars['String']['output'];
  appRegistrar: Scalars['String']['output'];
  gandalfID: Scalars['Int64']['output'];
  iconURL: Scalars['String']['output'];
  publicKey: Scalars['String']['output'];
};

/** Contains information related to the attestation process during user registration. */
export type Attestation = {
  /** Attestation object received during registration. */
  attestationObject: Scalars['String']['input'];
  /** JSON representation of client data. */
  clientDataJson: Scalars['String']['input'];
  credentialId: Scalars['String']['input'];
};

/** Represents a request for user authentication in the authentication system. */
export type AuthenticationRequest = {
  /** passkey user credential id for user. */
  credentialId: Scalars['String']['input'];
  /** Information related to the signed key during user authentication. */
  signedKey: SignedKey;
};

export type Identifier = {
  __typename?: 'Identifier';
  /** The type of the identifier (enumeration) */
  type: IdentifierType;
  /** The string value of the identifier. */
  value: Scalars['String']['output'];
};

export enum IdentifierType {
  Imdb = 'IMDB'
}

/** Represents a JSON Web Token. */
export type Jwt = {
  __typename?: 'JWT';
  /** The token string. */
  token: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** User authentication mutation. */
  authenticate: Jwt;
  /** Publishes an activity for a user profile. */
  publishActivity: Scalars['String']['output'];
  /** User registration mutation. */
  register: Jwt;
};


export type MutationAuthenticateArgs = {
  authenticationRequest: AuthenticationRequest;
};


export type MutationPublishActivityArgs = {
  activity: ActivityInput;
};


export type MutationRegisterArgs = {
  registrationRequest: RegistrationRequest;
};

export type NetflixActivityMetadata = {
  __typename?: 'NetflixActivityMetadata';
  /** List of identifiers associated with the activity's subject. */
  subject?: Maybe<Array<Maybe<Identifier>>>;
  /** Timestamp indicating when the activity occurred. */
  timestamp?: Maybe<Scalars['Time']['output']>;
  /** The title of the Netflix activity */
  title: Scalars['String']['output'];
};

/** Represents a request for user registration with additional parameters. */
export type PasskeyRegisterRequest = {
  __typename?: 'PasskeyRegisterRequest';
  /** Relying party information. */
  rp: Rp;
  /** User information. */
  user: PasskeyUser;
};

/** Represents a user in the authentication system. */
export type PasskeyUser = {
  __typename?: 'PasskeyUser';
  /** The display name of the user. */
  displayName: Scalars['String']['output'];
  /** Unique identifier for the user. */
  id: Scalars['String']['output'];
  /** The name of the user. */
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  activities: Array<Maybe<Activity>>;
  /** Retrieves the details of the currently logged-in user. */
  currentUser?: Maybe<User>;
  /** Generates passkey registration request. */
  generatePasskeyRegisterRequest?: Maybe<PasskeyRegisterRequest>;
  getAppByPublicKey: Application;
};


export type QueryActivitiesArgs = {
  source: Source;
};


export type QueryGeneratePasskeyRegisterRequestArgs = {
  displayName: Scalars['String']['input'];
};


export type QueryGetAppByPublicKeyArgs = {
  publicKey: Scalars['String']['input'];
};

/** Represents a request for user registration in the authentication system. */
export type RegistrationRequest = {
  /** Information related to the attestation process during user registration. */
  attestation: Attestation;
  /** A challenge string for additional security. */
  challenge: Scalars['String']['input'];
  /** The display name of the user. */
  displayName: Scalars['String']['input'];
  /** The name of the user. */
  name: Scalars['String']['input'];
};

/** Represents a relying party in the authentication system. */
export type Rp = {
  __typename?: 'Rp';
  /** Unique identifier for the relying party. */
  id: Scalars['String']['output'];
  /** The name of the relying party. */
  name: Scalars['String']['output'];
};

/** Contains information related to the signed key during user authentication. */
export type SignedKey = {
  stampHeaderName: Scalars['String']['input'];
  stampHeaderValue: Scalars['String']['input'];
};

export enum Source {
  Netflix = 'NETFLIX'
}

/** Represents a user entity. */
export type User = {
  __typename?: 'User';
  /** The unique identifier for the user. */
  id: Scalars['UUID']['output'];
  /** The identifier for the sub-organization associated with the user. */
  subOrganizationId: Scalars['String']['output'];
  /** The username of the user. */
  username: Scalars['String']['output'];
};

export type GetAppByPublicKeyQueryVariables = Exact<{
  publicKey: Scalars['String']['input'];
}>;


export type GetAppByPublicKeyQuery = { __typename?: 'Query', getAppByPublicKey: { __typename?: 'Application', appName: string, gandalfID: any } };


export const GetAppByPublicKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAppByPublicKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publicKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAppByPublicKey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"publicKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publicKey"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appName"}},{"kind":"Field","name":{"kind":"Name","value":"gandalfID"}}]}}]}}]} as unknown as DocumentNode<GetAppByPublicKeyQuery, GetAppByPublicKeyQueryVariables>;