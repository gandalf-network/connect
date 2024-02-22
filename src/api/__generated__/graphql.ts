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

export type ActivityResponse = {
  __typename?: 'ActivityResponse';
  data: Array<Maybe<Activity>>;
  /** The maximum number of activities to retrieve (limit: 300). */
  limit: Scalars['Int64']['output'];
  /** The page number from which activities are being pulled. */
  page: Scalars['Int64']['output'];
  /** The total number of available activities in the dataset. */
  total: Scalars['Int64']['output'];
};

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
  publishActivity: PublishActivityResponse;
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

export type PublishActivityResponse = {
  __typename?: 'PublishActivityResponse';
  dataKey: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** Retrieves the details of the currently logged-in user. */
  currentUser?: Maybe<User>;
  /** Generates passkey registration request. */
  generatePasskeyRegisterRequest?: Maybe<PasskeyRegisterRequest>;
  getAppByPublicKey: Application;
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

/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __Type = {
  __typename?: '__Type';
  kind: __TypeKind;
  name?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  specifiedByURL?: Maybe<Scalars['String']['output']>;
  fields?: Maybe<Array<__Field>>;
  interfaces?: Maybe<Array<__Type>>;
  possibleTypes?: Maybe<Array<__Type>>;
  enumValues?: Maybe<Array<__EnumValue>>;
  inputFields?: Maybe<Array<__InputValue>>;
  ofType?: Maybe<__Type>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeFieldsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeEnumValuesArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']['input']>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeInputFieldsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']['input']>;
};

/** An enum describing what kind of type a given `__Type` is. */
export enum __TypeKind {
  /** Indicates this type is a scalar. */
  Scalar = 'SCALAR',
  /** Indicates this type is an object. `fields` and `interfaces` are valid fields. */
  Object = 'OBJECT',
  /** Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields. */
  Interface = 'INTERFACE',
  /** Indicates this type is a union. `possibleTypes` is a valid field. */
  Union = 'UNION',
  /** Indicates this type is an enum. `enumValues` is a valid field. */
  Enum = 'ENUM',
  /** Indicates this type is an input object. `inputFields` is a valid field. */
  InputObject = 'INPUT_OBJECT',
  /** Indicates this type is a list. `ofType` is a valid field. */
  List = 'LIST',
  /** Indicates this type is a non-null. `ofType` is a valid field. */
  NonNull = 'NON_NULL'
}

/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type __Field = {
  __typename?: '__Field';
  name: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  args: Array<__InputValue>;
  type: __Type;
  isDeprecated: Scalars['Boolean']['output'];
  deprecationReason?: Maybe<Scalars['String']['output']>;
};


/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type __FieldArgsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value. */
export type __InputValue = {
  __typename?: '__InputValue';
  name: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  type: __Type;
  /** A GraphQL-formatted string representing the default value for this input value. */
  defaultValue?: Maybe<Scalars['String']['output']>;
  isDeprecated: Scalars['Boolean']['output'];
  deprecationReason?: Maybe<Scalars['String']['output']>;
};

/** One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string. */
export type __EnumValue = {
  __typename?: '__EnumValue';
  name: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  isDeprecated: Scalars['Boolean']['output'];
  deprecationReason?: Maybe<Scalars['String']['output']>;
};

export type GetAppByPublicKeyQueryVariables = Exact<{
  publicKey: Scalars['String']['input'];
}>;


export type GetAppByPublicKeyQuery = { __typename?: 'Query', getAppByPublicKey: { __typename?: 'Application', appName: string, gandalfID: any } };

export type GetSupportedServicesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSupportedServicesQuery = { __typename?: 'Query', __type?: { __typename?: '__Type', name?: string | null, enumValues?: Array<{ __typename?: '__EnumValue', name: string }> | null } | null };


export const GetAppByPublicKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAppByPublicKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publicKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAppByPublicKey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"publicKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publicKey"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appName"}},{"kind":"Field","name":{"kind":"Name","value":"gandalfID"}}]}}]}}]} as unknown as DocumentNode<GetAppByPublicKeyQuery, GetAppByPublicKeyQueryVariables>;
export const GetSupportedServicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSupportedServices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__type"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"Source","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"enumValues"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"includeDeprecated"},"value":{"kind":"BooleanValue","value":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetSupportedServicesQuery, GetSupportedServicesQueryVariables>;