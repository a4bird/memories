import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Represents NULL values */
  Void: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

/** Uploaded File Response */
export type UploadedFileResponse = {
  __typename?: 'UploadedFileResponse';
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  singleUpload: UploadedFileResponse;
  login?: Maybe<LoginOutput>;
  register?: Maybe<RegisterOutput>;
  logout?: Maybe<Scalars['Void']>;
  saveProfile?: Maybe<UserProfileOutput>;
};


export type MutationSingleUploadArgs = {
  file: Scalars['Upload'];
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


export type Error = {
  __typename?: 'Error';
  path: Scalars['String'];
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _dummy?: Maybe<Scalars['Boolean']>;
  me?: Maybe<MeOutput>;
};

export type UserAccount = {
  __typename?: 'UserAccount';
  id: Scalars['ID'];
  email: Scalars['String'];
  profile?: Maybe<UserProfile>;
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

/** Gender Enum */
export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER',
  Na = 'NA'
}

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
  & Pick<UserAccount, 'id' | 'email'>
  & { profile?: Maybe<(
    { __typename?: 'UserProfile' }
    & UserProfileFragment
  )> }
);

export type UserProfileFragment = (
  { __typename?: 'UserProfile' }
  & Pick<UserProfile, 'firstName' | 'lastName'>
);

export type FileUploadMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type FileUploadMutation = (
  { __typename?: 'Mutation' }
  & { singleUpload: (
    { __typename?: 'UploadedFileResponse' }
    & Pick<UploadedFileResponse, 'filename' | 'mimetype' | 'encoding' | 'url'>
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
export const FileUploadDocument = gql`
    mutation fileUpload($file: Upload!) {
  singleUpload(file: $file) {
    filename
    mimetype
    encoding
    url
  }
}
    `;
export type FileUploadMutationFn = Apollo.MutationFunction<FileUploadMutation, FileUploadMutationVariables>;

/**
 * __useFileUploadMutation__
 *
 * To run a mutation, you first call `useFileUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFileUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fileUploadMutation, { data, loading, error }] = useFileUploadMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useFileUploadMutation(baseOptions?: Apollo.MutationHookOptions<FileUploadMutation, FileUploadMutationVariables>) {
        return Apollo.useMutation<FileUploadMutation, FileUploadMutationVariables>(FileUploadDocument, baseOptions);
      }
export type FileUploadMutationHookResult = ReturnType<typeof useFileUploadMutation>;
export type FileUploadMutationResult = Apollo.MutationResult<FileUploadMutation>;
export type FileUploadMutationOptions = Apollo.BaseMutationOptions<FileUploadMutation, FileUploadMutationVariables>;
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
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
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
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
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
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
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
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;