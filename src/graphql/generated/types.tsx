import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Represents NULL values */
  Void: any;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
  /** A field whose value is a UTC Offset: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones */
  UtcOffset: any;
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  ISO8601Duration: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** Floats that will have a value less than 0. */
  NegativeFloat: any;
  /** Integers that will have a value less than 0. */
  NegativeInt: any;
  /** A string that cannot be passed as an empty value */
  NonEmptyString: any;
  /** Floats that will have a value of 0 or more. */
  NonNegativeFloat: any;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: any;
  /** Floats that will have a value of 0 or less. */
  NonPositiveFloat: any;
  /** Integers that will have a value of 0 or less. */
  NonPositiveInt: any;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: any;
  /** Floats that will have a value greater than 0. */
  PositiveFloat: any;
  /** Integers that will have a value greater than 0. */
  PositiveInt: any;
  /** A field whose value conforms to the standard postal code formats for United States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands, Spain, Denmark, Sweden, Belgium, India, Austria, Portugal, Switzerland or Luxembourg. */
  PostalCode: any;
  /** Floats that will have a value of 0 or more. */
  UnsignedFloat: any;
  /** Integers that will have a value of 0 or more. */
  UnsignedInt: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: any;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: any;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Byte: any;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: any;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  GUID: any;
  /** A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal. */
  Hexadecimal: any;
  /** A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors. */
  HexColorCode: any;
  /** A field whose value is a CSS HSL color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSL: any;
  /** A field whose value is a CSS HSLA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSLA: any;
  /** A field whose value is a IPv4 address: https://en.wikipedia.org/wiki/IPv4. */
  IPv4: any;
  /** A field whose value is a IPv6 address: https://en.wikipedia.org/wiki/IPv6. */
  IPv6: any;
  /** A field whose value is a ISBN-10 or ISBN-13 number: https://en.wikipedia.org/wiki/International_Standard_Book_Number. */
  ISBN: any;
  /** A field whose value is a IEEE 802 48-bit MAC address: https://en.wikipedia.org/wiki/MAC_address. */
  MAC: any;
  /** A field whose value is a valid TCP port within the range of 0 to 65535: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_ports */
  Port: any;
  /** A field whose value is a CSS RGB color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGB: any;
  /** A field whose value is a CSS RGBA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGBA: any;
  /** The `SafeInt` scalar type represents non-fractional signed whole numeric values that are considered safe as defined by the ECMAScript specification. */
  SafeInt: any;
  /** A currency string, such as $21.25 */
  USCurrency: any;
  /** A field whose value is a Currency: https://en.wikipedia.org/wiki/ISO_4217. */
  Currency: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** A field whose value is an International Bank Account Number (IBAN): https://en.wikipedia.org/wiki/International_Bank_Account_Number. */
  IBAN: any;
  /** A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c */
  ObjectID: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


/** Album */
export type Album = {
  __typename?: 'Album';
  /** Id */
  id: Scalars['Int'];
  /** Album Title */
  title: Scalars['String'];
  /** Album Description */
  description: Scalars['String'];
};

export type AlbumOutput = {
  __typename?: 'AlbumOutput';
  /** Id */
  id: Scalars['Int'];
  /** Album Title */
  title: Scalars['String'];
  /** Album Description */
  description: Scalars['String'];
  /** Created At */
  createdAt: Scalars['DateTime'];
};

export type AddAlbumOutput = {
  __typename?: 'AddAlbumOutput';
  album?: Maybe<AlbumOutput>;
  errors?: Maybe<Array<Error>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAlbum?: Maybe<AddAlbumOutput>;
  avatarPutPreSignedUrl: S3PutPreSignedUrlResponse;
  avatarGetPreSignedUrl: S3GetPreSignedUrlResponse;
  photoPutPreSignedUrl: S3PutPreSignedUrlResponse;
  login?: Maybe<LoginOutput>;
  register?: Maybe<RegisterOutput>;
  logout?: Maybe<Scalars['Void']>;
  saveProfile?: Maybe<UserProfileOutput>;
};


export type MutationAddAlbumArgs = {
  title: Scalars['String'];
  description: Scalars['String'];
};


export type MutationAvatarPutPreSignedUrlArgs = {
  filename: Scalars['String'];
  filetype: Scalars['String'];
};


export type MutationAvatarGetPreSignedUrlArgs = {
  filename: Scalars['String'];
};


export type MutationPhotoPutPreSignedUrlArgs = {
  albumId: Scalars['Int'];
  filename: Scalars['String'];
  filetype: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSaveProfileArgs = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  gender: Gender;
};

export type GetAlbumOutput = {
  __typename?: 'GetAlbumOutput';
  album?: Maybe<AlbumOutput>;
  errors?: Maybe<Array<Error>>;
};

export type GetAlbumsOutput = {
  __typename?: 'GetAlbumsOutput';
  albums?: Maybe<Array<AlbumOutput>>;
  errors?: Maybe<Array<Error>>;
};

export type Query = {
  __typename?: 'Query';
  getAlbum?: Maybe<GetAlbumOutput>;
  getAlbums?: Maybe<GetAlbumsOutput>;
  _dummy?: Maybe<Scalars['Boolean']>;
  me?: Maybe<MeOutput>;
  getUserProfile?: Maybe<UserProfileOutput>;
};


export type QueryGetAlbumArgs = {
  id: Scalars['Int'];
};

/** Uploaded File Response */
export type UploadedFileResponse = {
  __typename?: 'UploadedFileResponse';
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
  url: Scalars['String'];
};

export type S3PutPreSignedUrlResponse = {
  __typename?: 'S3PutPreSignedUrlResponse';
  signedRequest: Scalars['String'];
  url: Scalars['String'];
};

export type S3GetPreSignedUrlResponse = {
  __typename?: 'S3GetPreSignedUrlResponse';
  signedRequest: Scalars['String'];
  url: Scalars['String'];
};


export type Error = {
  __typename?: 'Error';
  path: Scalars['String'];
  message: Scalars['String'];
};

export type UserAccount = {
  __typename?: 'UserAccount';
  id: Scalars['ID'];
  email: Scalars['String'];
  profile?: Maybe<UserProfile>;
  photoUrl?: Maybe<Scalars['String']>;
};

export type RegisterOutput = {
  __typename?: 'RegisterOutput';
  userAccount?: Maybe<UserAccount>;
  errors?: Maybe<Array<Error>>;
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  userAccount?: Maybe<UserAccount>;
  errors?: Maybe<Array<Error>>;
};

export type MeOutput = {
  __typename?: 'MeOutput';
  userAccount?: Maybe<UserAccount>;
};

/** User Profile */
export type UserProfile = {
  __typename?: 'UserProfile';
  /** Id */
  id: Scalars['Int'];
  /** First Name */
  firstName: Scalars['String'];
  /** Last Name */
  lastName: Scalars['String'];
  /** Gender */
  gender: Gender;
};

export type UserProfileOutput = {
  __typename?: 'UserProfileOutput';
  userProfile?: Maybe<UserProfile>;
  errors?: Maybe<Array<Error>>;
};

/** Gender Enum */
export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER',
  Na = 'NA'
}













































export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type ErrorFragment = (
  { __typename?: 'Error' }
  & Pick<Error, 'path' | 'message'>
);

export type LoginOutputFragment = (
  { __typename?: 'LoginOutput' }
  & { errors?: Maybe<Array<(
    { __typename?: 'Error' }
    & ErrorFragment
  )>>, userAccount?: Maybe<(
    { __typename?: 'UserAccount' }
    & UserAccountFragment
  )> }
);

export type RegisterOutputFragment = (
  { __typename?: 'RegisterOutput' }
  & { errors?: Maybe<Array<(
    { __typename?: 'Error' }
    & ErrorFragment
  )>>, userAccount?: Maybe<(
    { __typename?: 'UserAccount' }
    & UserAccountFragment
  )> }
);

export type UserAccountFragment = (
  { __typename?: 'UserAccount' }
  & Pick<UserAccount, 'id' | 'email' | 'photoUrl'>
  & { profile?: Maybe<(
    { __typename?: 'UserProfile' }
    & UserProfileFragment
  )> }
);

export type UserProfileFragment = (
  { __typename?: 'UserProfile' }
  & Pick<UserProfile, 'firstName' | 'lastName'>
);

export type UserProfileOutputFragment = (
  { __typename?: 'UserProfileOutput' }
  & { errors?: Maybe<Array<(
    { __typename?: 'Error' }
    & ErrorFragment
  )>>, userProfile?: Maybe<(
    { __typename?: 'UserProfile' }
    & Pick<UserProfile, 'gender'>
    & UserProfileFragment
  )> }
);

export type AvatarPutPreSignedUrlMutationVariables = Exact<{
  filename: Scalars['String'];
  filetype: Scalars['String'];
}>;


export type AvatarPutPreSignedUrlMutation = (
  { __typename?: 'Mutation' }
  & { avatarPutPreSignedUrl: (
    { __typename?: 'S3PutPreSignedUrlResponse' }
    & Pick<S3PutPreSignedUrlResponse, 'signedRequest' | 'url'>
  ) }
);

export type PhotoPutPreSignedUrlMutationVariables = Exact<{
  albumId: Scalars['Int'];
  filename: Scalars['String'];
  filetype: Scalars['String'];
}>;


export type PhotoPutPreSignedUrlMutation = (
  { __typename?: 'Mutation' }
  & { photoPutPreSignedUrl: (
    { __typename?: 'S3PutPreSignedUrlResponse' }
    & Pick<S3PutPreSignedUrlResponse, 'signedRequest' | 'url'>
  ) }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'LoginOutput' }
    & LoginOutputFragment
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register?: Maybe<(
    { __typename?: 'RegisterOutput' }
    & RegisterOutputFragment
  )> }
);

export type SaveProfileMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  gender: Gender;
}>;


export type SaveProfileMutation = (
  { __typename?: 'Mutation' }
  & { saveProfile?: Maybe<(
    { __typename?: 'UserProfileOutput' }
    & UserProfileOutputFragment
  )> }
);

export type AddAlbumMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
}>;


export type AddAlbumMutation = (
  { __typename?: 'Mutation' }
  & { addAlbum?: Maybe<(
    { __typename?: 'AddAlbumOutput' }
    & { album?: Maybe<(
      { __typename?: 'AlbumOutput' }
      & Pick<AlbumOutput, 'id' | 'title' | 'description' | 'createdAt'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'Error' }
      & ErrorFragment
    )>> }
  )> }
);

export type GetAlbumQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetAlbumQuery = (
  { __typename?: 'Query' }
  & { getAlbum?: Maybe<(
    { __typename?: 'GetAlbumOutput' }
    & { album?: Maybe<(
      { __typename?: 'AlbumOutput' }
      & Pick<AlbumOutput, 'id' | 'title' | 'description' | 'createdAt'>
    )> }
  )> }
);

export type GetAlbumsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAlbumsQuery = (
  { __typename?: 'Query' }
  & { getAlbums?: Maybe<(
    { __typename?: 'GetAlbumsOutput' }
    & { albums?: Maybe<Array<(
      { __typename?: 'AlbumOutput' }
      & Pick<AlbumOutput, 'id' | 'title' | 'description' | 'createdAt'>
    )>> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'MeOutput' }
    & { userAccount?: Maybe<(
      { __typename?: 'UserAccount' }
      & { profile?: Maybe<(
        { __typename?: 'UserProfile' }
        & UserProfileFragment
      )> }
      & UserAccountFragment
    )> }
  )> }
);

export type GetUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProfileQuery = (
  { __typename?: 'Query' }
  & { getUserProfile?: Maybe<(
    { __typename?: 'UserProfileOutput' }
    & { userProfile?: Maybe<(
      { __typename?: 'UserProfile' }
      & Pick<UserProfile, 'firstName' | 'lastName' | 'gender'>
    )> }
  )> }
);

export const ErrorFragmentDoc = gql`
    fragment Error on Error {
  path
  message
}
    `;
export const UserProfileFragmentDoc = gql`
    fragment UserProfile on UserProfile {
  firstName
  lastName
}
    `;
export const UserAccountFragmentDoc = gql`
    fragment UserAccount on UserAccount {
  id
  email
  photoUrl
  profile {
    ...UserProfile
  }
}
    ${UserProfileFragmentDoc}`;
export const LoginOutputFragmentDoc = gql`
    fragment LoginOutput on LoginOutput {
  errors {
    ...Error
  }
  userAccount {
    ...UserAccount
  }
}
    ${ErrorFragmentDoc}
${UserAccountFragmentDoc}`;
export const RegisterOutputFragmentDoc = gql`
    fragment RegisterOutput on RegisterOutput {
  errors {
    ...Error
  }
  userAccount {
    ...UserAccount
  }
}
    ${ErrorFragmentDoc}
${UserAccountFragmentDoc}`;
export const UserProfileOutputFragmentDoc = gql`
    fragment UserProfileOutput on UserProfileOutput {
  errors {
    ...Error
  }
  userProfile {
    ...UserProfile
    gender
  }
}
    ${ErrorFragmentDoc}
${UserProfileFragmentDoc}`;
export const AvatarPutPreSignedUrlDocument = gql`
    mutation avatarPutPreSignedUrl($filename: String!, $filetype: String!) {
  avatarPutPreSignedUrl(filename: $filename, filetype: $filetype) {
    signedRequest
    url
  }
}
    `;
export type AvatarPutPreSignedUrlMutationFn = Apollo.MutationFunction<AvatarPutPreSignedUrlMutation, AvatarPutPreSignedUrlMutationVariables>;

/**
 * __useAvatarPutPreSignedUrlMutation__
 *
 * To run a mutation, you first call `useAvatarPutPreSignedUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAvatarPutPreSignedUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [avatarPutPreSignedUrlMutation, { data, loading, error }] = useAvatarPutPreSignedUrlMutation({
 *   variables: {
 *      filename: // value for 'filename'
 *      filetype: // value for 'filetype'
 *   },
 * });
 */
export function useAvatarPutPreSignedUrlMutation(baseOptions?: Apollo.MutationHookOptions<AvatarPutPreSignedUrlMutation, AvatarPutPreSignedUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AvatarPutPreSignedUrlMutation, AvatarPutPreSignedUrlMutationVariables>(AvatarPutPreSignedUrlDocument, options);
      }
export type AvatarPutPreSignedUrlMutationHookResult = ReturnType<typeof useAvatarPutPreSignedUrlMutation>;
export type AvatarPutPreSignedUrlMutationResult = Apollo.MutationResult<AvatarPutPreSignedUrlMutation>;
export type AvatarPutPreSignedUrlMutationOptions = Apollo.BaseMutationOptions<AvatarPutPreSignedUrlMutation, AvatarPutPreSignedUrlMutationVariables>;
export const PhotoPutPreSignedUrlDocument = gql`
    mutation photoPutPreSignedUrl($albumId: Int!, $filename: String!, $filetype: String!) {
  photoPutPreSignedUrl(albumId: $albumId, filename: $filename, filetype: $filetype) {
    signedRequest
    url
  }
}
    `;
export type PhotoPutPreSignedUrlMutationFn = Apollo.MutationFunction<PhotoPutPreSignedUrlMutation, PhotoPutPreSignedUrlMutationVariables>;

/**
 * __usePhotoPutPreSignedUrlMutation__
 *
 * To run a mutation, you first call `usePhotoPutPreSignedUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePhotoPutPreSignedUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [photoPutPreSignedUrlMutation, { data, loading, error }] = usePhotoPutPreSignedUrlMutation({
 *   variables: {
 *      albumId: // value for 'albumId'
 *      filename: // value for 'filename'
 *      filetype: // value for 'filetype'
 *   },
 * });
 */
export function usePhotoPutPreSignedUrlMutation(baseOptions?: Apollo.MutationHookOptions<PhotoPutPreSignedUrlMutation, PhotoPutPreSignedUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PhotoPutPreSignedUrlMutation, PhotoPutPreSignedUrlMutationVariables>(PhotoPutPreSignedUrlDocument, options);
      }
export type PhotoPutPreSignedUrlMutationHookResult = ReturnType<typeof usePhotoPutPreSignedUrlMutation>;
export type PhotoPutPreSignedUrlMutationResult = Apollo.MutationResult<PhotoPutPreSignedUrlMutation>;
export type PhotoPutPreSignedUrlMutationOptions = Apollo.BaseMutationOptions<PhotoPutPreSignedUrlMutation, PhotoPutPreSignedUrlMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(email: $usernameOrEmail, password: $password) {
    ...LoginOutput
  }
}
    ${LoginOutputFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($usernameOrEmail: String!, $password: String!) {
  register(email: $usernameOrEmail, password: $password) {
    ...RegisterOutput
  }
}
    ${RegisterOutputFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SaveProfileDocument = gql`
    mutation SaveProfile($firstName: String!, $lastName: String!, $gender: Gender!) {
  saveProfile(firstName: $firstName, lastName: $lastName, gender: $gender) {
    ...UserProfileOutput
  }
}
    ${UserProfileOutputFragmentDoc}`;
export type SaveProfileMutationFn = Apollo.MutationFunction<SaveProfileMutation, SaveProfileMutationVariables>;

/**
 * __useSaveProfileMutation__
 *
 * To run a mutation, you first call `useSaveProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveProfileMutation, { data, loading, error }] = useSaveProfileMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      gender: // value for 'gender'
 *   },
 * });
 */
export function useSaveProfileMutation(baseOptions?: Apollo.MutationHookOptions<SaveProfileMutation, SaveProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveProfileMutation, SaveProfileMutationVariables>(SaveProfileDocument, options);
      }
export type SaveProfileMutationHookResult = ReturnType<typeof useSaveProfileMutation>;
export type SaveProfileMutationResult = Apollo.MutationResult<SaveProfileMutation>;
export type SaveProfileMutationOptions = Apollo.BaseMutationOptions<SaveProfileMutation, SaveProfileMutationVariables>;
export const AddAlbumDocument = gql`
    mutation addAlbum($title: String!, $description: String!) {
  addAlbum(title: $title, description: $description) {
    album {
      id
      title
      description
      createdAt
    }
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type AddAlbumMutationFn = Apollo.MutationFunction<AddAlbumMutation, AddAlbumMutationVariables>;

/**
 * __useAddAlbumMutation__
 *
 * To run a mutation, you first call `useAddAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAlbumMutation, { data, loading, error }] = useAddAlbumMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useAddAlbumMutation(baseOptions?: Apollo.MutationHookOptions<AddAlbumMutation, AddAlbumMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAlbumMutation, AddAlbumMutationVariables>(AddAlbumDocument, options);
      }
export type AddAlbumMutationHookResult = ReturnType<typeof useAddAlbumMutation>;
export type AddAlbumMutationResult = Apollo.MutationResult<AddAlbumMutation>;
export type AddAlbumMutationOptions = Apollo.BaseMutationOptions<AddAlbumMutation, AddAlbumMutationVariables>;
export const GetAlbumDocument = gql`
    query getAlbum($id: Int!) {
  getAlbum(id: $id) {
    album {
      id
      title
      description
      createdAt
    }
  }
}
    `;

/**
 * __useGetAlbumQuery__
 *
 * To run a query within a React component, call `useGetAlbumQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlbumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlbumQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAlbumQuery(baseOptions: Apollo.QueryHookOptions<GetAlbumQuery, GetAlbumQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAlbumQuery, GetAlbumQueryVariables>(GetAlbumDocument, options);
      }
export function useGetAlbumLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAlbumQuery, GetAlbumQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAlbumQuery, GetAlbumQueryVariables>(GetAlbumDocument, options);
        }
export type GetAlbumQueryHookResult = ReturnType<typeof useGetAlbumQuery>;
export type GetAlbumLazyQueryHookResult = ReturnType<typeof useGetAlbumLazyQuery>;
export type GetAlbumQueryResult = Apollo.QueryResult<GetAlbumQuery, GetAlbumQueryVariables>;
export const GetAlbumsDocument = gql`
    query getAlbums {
  getAlbums {
    albums {
      id
      title
      description
      createdAt
    }
  }
}
    `;

/**
 * __useGetAlbumsQuery__
 *
 * To run a query within a React component, call `useGetAlbumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlbumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlbumsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAlbumsQuery(baseOptions?: Apollo.QueryHookOptions<GetAlbumsQuery, GetAlbumsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAlbumsQuery, GetAlbumsQueryVariables>(GetAlbumsDocument, options);
      }
export function useGetAlbumsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAlbumsQuery, GetAlbumsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAlbumsQuery, GetAlbumsQueryVariables>(GetAlbumsDocument, options);
        }
export type GetAlbumsQueryHookResult = ReturnType<typeof useGetAlbumsQuery>;
export type GetAlbumsLazyQueryHookResult = ReturnType<typeof useGetAlbumsLazyQuery>;
export type GetAlbumsQueryResult = Apollo.QueryResult<GetAlbumsQuery, GetAlbumsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    userAccount {
      ...UserAccount
      profile {
        ...UserProfile
      }
    }
  }
}
    ${UserAccountFragmentDoc}
${UserProfileFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetUserProfileDocument = gql`
    query getUserProfile {
  getUserProfile {
    userProfile {
      firstName
      lastName
      gender
    }
  }
}
    `;

/**
 * __useGetUserProfileQuery__
 *
 * To run a query within a React component, call `useGetUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
      }
export function useGetUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
        }
export type GetUserProfileQueryHookResult = ReturnType<typeof useGetUserProfileQuery>;
export type GetUserProfileLazyQueryHookResult = ReturnType<typeof useGetUserProfileLazyQuery>;
export type GetUserProfileQueryResult = Apollo.QueryResult<GetUserProfileQuery, GetUserProfileQueryVariables>;