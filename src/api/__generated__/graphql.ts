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
  Date: { input: any; output: any; }
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

export type ActivityMetadata = {
  /** List of identifiers associated with the activity's subject. */
  subject?: Maybe<Array<Maybe<Identifier>>>;
};

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

export enum ActivityType {
  Play = 'PLAY',
  Shop = 'SHOP',
  Stay = 'STAY',
  Trip = 'TRIP',
  Watch = 'WATCH'
}

export type AmazonActivityMetadata = ActivityMetadata & {
  __typename?: 'AmazonActivityMetadata';
  /** Date indicating when the activity occurred. */
  date?: Maybe<Scalars['Date']['output']>;
  /** The product name of the Amazon activity */
  productName: Scalars['String']['output'];
  /** Quantity of item purchased */
  quantityPurchased: Scalars['Int']['output'];
  /** List of identifiers associated with the activity's subject. */
  subject?: Maybe<Array<Maybe<Identifier>>>;
  /** Total cost of purchased product */
  totalCost: Scalars['String']['output'];
};

/**
 * Represents a registered application within the system, encapsulating all relevant details
 * that identify and describe the application.
 */
export type Application = {
  __typename?: 'Application';
  /** The human-readable name of the application. */
  appName: Scalars['String']['output'];
  /** The address of the user who registered the application.  */
  appRegistrar: Scalars['String']['output'];
  /** A unique identifier assigned to the application upon registration. */
  gandalfID: Scalars['Int64']['output'];
  /**
   * The URL pointing to the icon graphic for the application. This URL should link to an image
   * that visually represents the application, aiding in its identification and branding.
   */
  iconURL: Scalars['String']['output'];
  /**
   * A public key associated with the application, used for cryptographic operations such as
   * verifying the identity of the application.
   */
  publicKey: Scalars['String']['output'];
};

export type BookingActivityMetadata = ActivityMetadata & {
  __typename?: 'BookingActivityMetadata';
  /** Reference identifying a booking */
  bookingID: Scalars['String']['output'];
  /** An array of bookings in a single purchase */
  bookings: Array<Maybe<BookingItemInterface>>;
  /** The ticket or bill of a trip or stay */
  price: Scalars['String']['output'];
  /** List of identifiers associated with the activity's subject. */
  subject?: Maybe<Array<Maybe<Identifier>>>;
};

export type BookingItemInterface = {
  /** Activity type of the returned data source */
  activityType: ActivityType;
};

export enum ContentType {
  Music = 'MUSIC',
  Shorts = 'SHORTS',
  Video = 'VIDEO'
}

export type Identifier = {
  __typename?: 'Identifier';
  /** The type of the identifier (enumeration) */
  identifierType: IdentifierType;
  /** The string value of the identifier. */
  value: Scalars['String']['output'];
};

export enum IdentifierType {
  Asin = 'ASIN',
  Booking = 'BOOKING',
  Igdb = 'IGDB',
  Imdb = 'IMDB',
  Instacart = 'INSTACART',
  Moby = 'MOBY',
  Playstation = 'PLAYSTATION',
  Rawg = 'RAWG',
  Tvdb = 'TVDB',
  Tvmaze = 'TVMAZE',
  Uber = 'UBER',
  Ubereats = 'UBEREATS',
  Youtube = 'YOUTUBE'
}

export type InstacartActivityMetadata = ActivityMetadata & {
  __typename?: 'InstacartActivityMetadata';
  /** The date the order was delivered */
  dateDelivered: Scalars['Date']['output'];
  /** The date the order was placed */
  dateOrdered: Scalars['Date']['output'];
  /** List of items ordered. */
  items: Array<Maybe<InstacartOrderItem>>;
  /** The name of the ratailer that handled the order. */
  retailer: Scalars['String']['output'];
  /** String indicating the status of the order */
  statusString: Scalars['String']['output'];
  /** List of identifiers associated with the activity's subject. */
  subject?: Maybe<Array<Maybe<Identifier>>>;
  /** The total amount spent on this order. */
  totalOrderAmountSpent: Scalars['String']['output'];
};

export enum InstacartItemStatus {
  Found = 'FOUND',
  Replaced = 'REPLACED',
  Torefund = 'TOREFUND'
}

export type InstacartOrderItem = {
  __typename?: 'InstacartOrderItem';
  /** The Instacart ID of the item */
  itemID: Scalars['String']['output'];
  /** The name of the ordered item. */
  productName: Scalars['String']['output'];
  /** The quantity purchased. */
  quantityPurchased: Scalars['Int64']['output'];
  /** Enum indicating the status of the ordered item e.g found */
  status: InstacartItemStatus;
  /** The price per unit e.g (1.39 • 1 gal). */
  unitPrice: Scalars['String']['output'];
};

export enum InstacartOrderStatus {
  Complete = 'COMPLETE'
}

export type NetflixActivityMetadata = ActivityMetadata & {
  __typename?: 'NetflixActivityMetadata';
  /**
   * Date indicating when the activity occurred , formatted as (DD/MM/YYYY).
   * @deprecated use lastPlayedAt
   */
  date?: Maybe<Scalars['Date']['output']>;
  /** Date indicating when the activity was last played , formatted as (DD/MM/YYYY). */
  lastPlayedAt?: Maybe<Scalars['Date']['output']>;
  /** List of identifiers associated with the activity's subject. */
  subject?: Maybe<Array<Maybe<Identifier>>>;
  /** The title of the Netflix activity */
  title: Scalars['String']['output'];
};

export type PlaystationActivityMetadata = ActivityMetadata & {
  __typename?: 'PlaystationActivityMetadata';
  /** Date indicating the last time game was played. */
  lastPlayedAt?: Maybe<Scalars['Date']['output']>;
  /** List of identifiers associated with the activity's subject. */
  subject?: Maybe<Array<Maybe<Identifier>>>;
  /** The title of the Playstation activity */
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  /**
   * Retrieves a paginated list of activities based on a given data key and source.
   *
   * Returns: A response object containing a list of activities, along with pagination information.
   */
  getActivity: ActivityResponse;
  /**
   * Retrieves an application by its public key.
   *
   * Returns: An Application object that includes detailed information about the requested application.
   */
  getAppByPublicKey: Application;
  /**
   * get user traits for a specific source by datakey
   *
   * Returns: A response object containing a list of traits.
   */
  getTraits: Array<Maybe<Trait>>;
  /**
   * Looks up a specific activity by its unique identifier (ID) and a data key.
   *
   * Returns: An Activity object containing detailed information about the requested activity.
   */
  lookupActivity: Activity;
  /**
   * Looks up a specific trait by its unique identifier (ID) and a data key.
   *
   * Returns: A trait object containing detailed information about the requested trait.
   */
  lookupTrait: Trait;
};


export type QueryGetActivityArgs = {
  activityType?: InputMaybe<Array<InputMaybe<ActivityType>>>;
  dataKey: Scalars['String']['input'];
  limit: Scalars['Int64']['input'];
  page: Scalars['Int64']['input'];
  source: Source;
};


export type QueryGetAppByPublicKeyArgs = {
  publicKey: Scalars['String']['input'];
};


export type QueryGetTraitsArgs = {
  dataKey: Scalars['String']['input'];
  labels: Array<InputMaybe<TraitLabel>>;
  source: Source;
};


export type QueryLookupActivityArgs = {
  activityId: Scalars['UUID']['input'];
  dataKey: Scalars['String']['input'];
};


export type QueryLookupTraitArgs = {
  dataKey: Scalars['String']['input'];
  traitId: Scalars['UUID']['input'];
};

export enum Source {
  Amazon = 'AMAZON',
  Booking = 'BOOKING',
  Farcaster = 'FARCASTER',
  Gandalf = 'GANDALF',
  Instacart = 'INSTACART',
  Instagram = 'INSTAGRAM',
  Netflix = 'NETFLIX',
  Playstation = 'PLAYSTATION',
  Uber = 'UBER',
  Ubereats = 'UBEREATS',
  X = 'X',
  Youtube = 'YOUTUBE'
}

export type StayBooking = BookingItemInterface & {
  __typename?: 'StayBooking';
  /** Activity type of the returned data source */
  activityType: ActivityType;
  /** The location of a trip */
  address: Scalars['String']['output'];
  /** CheckOut time of a booking */
  endDateTime: Scalars['Time']['output'];
  /** CheckIn time of a booking */
  startDateTime: Scalars['Time']['output'];
};

/** Represents a User Trait. */
export type Trait = {
  __typename?: 'Trait';
  /** Unique identifier for the trait. */
  id: Scalars['UUID']['output'];
  /** The label of the trait. */
  label: TraitLabel;
  /** The source of the trait. */
  source: Source;
  /** The timestamp when the trait was recorded. */
  timestamp: Scalars['Time']['output'];
  /** The value of the trait. */
  value: Scalars['String']['output'];
};

/** Represents the labels for different user traits. */
export enum TraitLabel {
  /** Date when the user account was created. */
  AccountCreatedOn = 'ACCOUNT_CREATED_ON',
  /** The user's account ID on the platform. */
  AccountId = 'ACCOUNT_ID',
  /** The users email. */
  Email = 'EMAIL',
  /** The user's farcaster address. */
  FarcasterAddress = 'FARCASTER_ADDRESS',
  /** The number of account following the user. */
  FollowerCount = 'FOLLOWER_COUNT',
  /** The number of accounts followed by the user. */
  FollowingCount = 'FOLLOWING_COUNT',
  /** User's genius level. */
  GeniusLevel = 'GENIUS_LEVEL',
  /** The number of orders the user has made on the platform. */
  OrderCount = 'ORDER_COUNT',
  /** User plan. */
  Plan = 'PLAN',
  /** The number of posts the user has made on the platform. */
  PostCount = 'POST_COUNT',
  /** Indicates if the user is a prime subscriber. */
  PrimeSubscriber = 'PRIME_SUBSCRIBER',
  /** User rating. */
  Rating = 'RATING',
  /** Number of trips taken by the user. */
  TripCount = 'TRIP_COUNT',
  /** The users profile name. */
  Username = 'USERNAME'
}

export type TripBooking = BookingItemInterface & {
  __typename?: 'TripBooking';
  /** Activity type of the returned data source */
  activityType: ActivityType;
  /** The location of arrival of a booking flight */
  arrivalLocation: Scalars['String']['output'];
  /** The location where a booking flight takes off from */
  departureLocation: Scalars['String']['output'];
  /** A string listing the stops of a flight between its departure and arrival locations */
  layoverLocations: Array<Maybe<Scalars['String']['output']>>;
};

export enum TripStatus {
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Unfulfilled = 'UNFULFILLED'
}

export type UberActivityMetadata = ActivityMetadata & {
  __typename?: 'UberActivityMetadata';
  /** This indicates the start time of the trip */
  beginTripTime: Scalars['Time']['output'];
  /** A string indicating the city the trip originated from */
  city: Scalars['String']['output'];
  /** A string indicating the cost of the trip */
  cost: Scalars['String']['output'];
  /** Distance covered from pickup to dropoff location */
  distance: Scalars['String']['output'];
  /** This indicates the end time of the trip */
  dropoffTime?: Maybe<Scalars['Time']['output']>;
  /** Enum indicating the status of a trip */
  status: TripStatus;
  /** List of identifiers associated with the activity's subject. */
  subject?: Maybe<Array<Maybe<Identifier>>>;
};

export type UberEatsActivityMetadata = ActivityMetadata & {
  __typename?: 'UberEatsActivityMetadata';
  /** The currency the order was priced in. */
  currency: Scalars['String']['output'];
  /** Date indicating when the order was made. */
  date?: Maybe<Scalars['Date']['output']>;
  /** List of items ordered. */
  items: Array<Maybe<UberEatsOrderItem>>;
  /** The name of the restaurant that handled the order. */
  restaurant: Scalars['String']['output'];
  /** Enum indicating the status of the order */
  status: UberEatsOrderStatus;
  /** List of identifiers associated with the activity's subject. */
  subject?: Maybe<Array<Maybe<Identifier>>>;
  /** The total amount spent on this order. */
  totalPrice: Scalars['Float']['output'];
};

export type UberEatsOrderItem = {
  __typename?: 'UberEatsOrderItem';
  /** Order customizations. */
  customizations: Array<Maybe<UberEatsOrderItemCustomizations>>;
  /** The name of the ordered item. */
  name: Scalars['String']['output'];
  /** The price per unit. */
  price: Scalars['String']['output'];
  /** The quantity purchased. */
  quantityPurchased: Scalars['Int64']['output'];
};

export type UberEatsOrderItemCustomizations = {
  __typename?: 'UberEatsOrderItemCustomizations';
  /** The customization tag. */
  customization: Scalars['String']['output'];
  /** The customization quantity requested. */
  quantity: Scalars['Int64']['output'];
  /** The customization chosen. */
  value: Scalars['String']['output'];
};

export enum UberEatsOrderStatus {
  EaterCancelled = 'EATER_CANCELLED',
  RestaurantCancelled = 'RESTAURANT_CANCELLED',
  RestaurantUnfulfilled = 'RESTAURANT_UNFULFILLED',
  Success = 'SUCCESS',
  Unknown = 'UNKNOWN'
}

export type YoutubeActivityMetadata = ActivityMetadata & {
  __typename?: 'YoutubeActivityMetadata';
  /** Enum denoting the type of the youtube activity */
  contentType: ContentType;
  /** Date indicating the last time the Youtube video was played. */
  date?: Maybe<Scalars['Date']['output']>;
  /** An integer indicating what percentage of the entire video duration watched. */
  percentageWatched: Scalars['Int']['output'];
  /** List of identifiers associated with the activity's subject. */
  subject?: Maybe<Array<Maybe<Identifier>>>;
  /** The title of the Youtube activity */
  title: Scalars['String']['output'];
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


export type GetSupportedServicesQuery = { __typename?: 'Query', __sourceType?: { __typename?: '__Type', name?: string | null, enumValues?: Array<{ __typename?: '__EnumValue', name: string }> | null } | null, __traitType?: { __typename?: '__Type', name?: string | null, enumValues?: Array<{ __typename?: '__EnumValue', name: string }> | null } | null, __activityType?: { __typename?: '__Type', name?: string | null, enumValues?: Array<{ __typename?: '__EnumValue', name: string }> | null } | null };


export const GetAppByPublicKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAppByPublicKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publicKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAppByPublicKey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"publicKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publicKey"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appName"}},{"kind":"Field","name":{"kind":"Name","value":"gandalfID"}}]}}]}}]} as unknown as DocumentNode<GetAppByPublicKeyQuery, GetAppByPublicKeyQueryVariables>;
export const GetSupportedServicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSupportedServices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"__sourceType"},"name":{"kind":"Name","value":"__type"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"Source","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"enumValues"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"includeDeprecated"},"value":{"kind":"BooleanValue","value":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"__traitType"},"name":{"kind":"Name","value":"__type"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"TraitLabel","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"enumValues"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"includeDeprecated"},"value":{"kind":"BooleanValue","value":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"__activityType"},"name":{"kind":"Name","value":"__type"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"ActivityType","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"enumValues"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"includeDeprecated"},"value":{"kind":"BooleanValue","value":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetSupportedServicesQuery, GetSupportedServicesQueryVariables>;