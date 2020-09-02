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
};

export type Error = {
  __typename?: 'Error';
  path: Scalars['String'];
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _dummy?: Maybe<Scalars['Boolean']>;
};

export type UserAccount = {
  __typename?: 'UserAccount';
  id: Scalars['ID'];
  email: Scalars['String'];
};

export type UserAccountOutput = {
  __typename?: 'UserAccountOutput';
  userAccount?: Maybe<UserAccount>;
  errors?: Maybe<Array<Error>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<UserAccountOutput>;
  register?: Maybe<UserAccountOutput>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegularErrorFragment = (
  { __typename?: 'Error' }
  & Pick<Error, 'path' | 'message'>
);

export type RegularUserAccountFragment = (
  { __typename?: 'UserAccount' }
  & Pick<UserAccount, 'id' | 'email'>
);

export type UserAccountOutputFragment = (
  { __typename?: 'UserAccountOutput' }
  & { errors?: Maybe<Array<(
    { __typename?: 'Error' }
    & RegularErrorFragment
  )>>, userAccount?: Maybe<(
    { __typename?: 'UserAccount' }
    & RegularUserAccountFragment
  )> }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'UserAccountOutput' }
    & UserAccountOutputFragment
  )> }
);

export type RegisterMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register?: Maybe<(
    { __typename?: 'UserAccountOutput' }
    & UserAccountOutputFragment
  )> }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on Error {
  path
  message
}
    `;
export const RegularUserAccountFragmentDoc = gql`
    fragment RegularUserAccount on UserAccount {
  id
  email
}
    `;
export const UserAccountOutputFragmentDoc = gql`
    fragment UserAccountOutput on UserAccountOutput {
  errors {
    ...RegularError
  }
  userAccount {
    ...RegularUserAccount
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserAccountFragmentDoc}`;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(email: $usernameOrEmail, password: $password) {
    ...UserAccountOutput
  }
}
    ${UserAccountOutputFragmentDoc}`;
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
export const RegisterDocument = gql`
    mutation Register($usernameOrEmail: String!, $password: String!) {
  register(email: $usernameOrEmail, password: $password) {
    ...UserAccountOutput
  }
}
    ${UserAccountOutputFragmentDoc}`;
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