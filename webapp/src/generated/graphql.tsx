import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Account = {
  __typename?: 'Account';
  _count?: Maybe<AccountCount>;
  address: Scalars['String'];
  id: Scalars['String'];
  projects: Array<Project>;
};


export type AccountProjectsArgs = {
  cursor?: InputMaybe<ProjectWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProjectScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProjectOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectWhereInput>;
};

export type AccountCount = {
  __typename?: 'AccountCount';
  projects: Scalars['Int'];
};

export type AccountOrderByWithRelationInput = {
  address?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  projects?: InputMaybe<ProjectOrderByRelationAggregateInput>;
};

export type AccountRelationFilter = {
  is?: InputMaybe<AccountWhereInput>;
  isNot?: InputMaybe<AccountWhereInput>;
};

export type AccountWhereInput = {
  AND?: InputMaybe<Array<AccountWhereInput>>;
  NOT?: InputMaybe<Array<AccountWhereInput>>;
  OR?: InputMaybe<Array<AccountWhereInput>>;
  address?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  projects?: InputMaybe<ProjectListRelationFilter>;
};

export type AuthInput = {
  pubKey: Scalars['String'];
  signedTxBase64: Scalars['String'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
};

export type GenerateNonceInput = {
  address: Scalars['String'];
};

export type GenerateNoncePayload = {
  __typename?: 'GenerateNoncePayload';
  nonce: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  auth: AuthPayload;
  generateNonce: GenerateNoncePayload;
};


export type MutationAuthArgs = {
  input: AuthInput;
};


export type MutationGenerateNonceArgs = {
  input: GenerateNonceInput;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['String'];
  name: Scalars['String'];
  ownerId: Scalars['String'];
};

export type ProjectListRelationFilter = {
  every?: InputMaybe<ProjectWhereInput>;
  none?: InputMaybe<ProjectWhereInput>;
  some?: InputMaybe<ProjectWhereInput>;
};

export type ProjectOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ProjectOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  owner?: InputMaybe<AccountOrderByWithRelationInput>;
  ownerId?: InputMaybe<SortOrder>;
};

export enum ProjectScalarFieldEnum {
  Id = 'id',
  Name = 'name',
  OwnerId = 'ownerId'
}

export type ProjectWhereInput = {
  AND?: InputMaybe<Array<ProjectWhereInput>>;
  NOT?: InputMaybe<Array<ProjectWhereInput>>;
  OR?: InputMaybe<Array<ProjectWhereInput>>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  owner?: InputMaybe<AccountRelationFilter>;
  ownerId?: InputMaybe<StringFilter>;
};

export type ProjectWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<Account>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type AuthMutationVariables = Exact<{
  input: AuthInput;
}>;


export type AuthMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthPayload', token: string } };

export type GenerateNonceMutationVariables = Exact<{
  input: GenerateNonceInput;
}>;


export type GenerateNonceMutation = { __typename?: 'Mutation', generateNonce: { __typename?: 'GenerateNoncePayload', nonce: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Account', id: string, address: string, projects: Array<{ __typename?: 'Project', id: string, name: string }> } | null };


export const AuthDocument = gql`
    mutation Auth($input: AuthInput!) {
  auth(input: $input) {
    token
  }
}
    `;
export type AuthMutationFn = Apollo.MutationFunction<AuthMutation, AuthMutationVariables>;

/**
 * __useAuthMutation__
 *
 * To run a mutation, you first call `useAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authMutation, { data, loading, error }] = useAuthMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAuthMutation(baseOptions?: Apollo.MutationHookOptions<AuthMutation, AuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthMutation, AuthMutationVariables>(AuthDocument, options);
      }
export type AuthMutationHookResult = ReturnType<typeof useAuthMutation>;
export type AuthMutationResult = Apollo.MutationResult<AuthMutation>;
export type AuthMutationOptions = Apollo.BaseMutationOptions<AuthMutation, AuthMutationVariables>;
export const GenerateNonceDocument = gql`
    mutation GenerateNonce($input: GenerateNonceInput!) {
  generateNonce(input: $input) {
    nonce
  }
}
    `;
export type GenerateNonceMutationFn = Apollo.MutationFunction<GenerateNonceMutation, GenerateNonceMutationVariables>;

/**
 * __useGenerateNonceMutation__
 *
 * To run a mutation, you first call `useGenerateNonceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateNonceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateNonceMutation, { data, loading, error }] = useGenerateNonceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateNonceMutation(baseOptions?: Apollo.MutationHookOptions<GenerateNonceMutation, GenerateNonceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateNonceMutation, GenerateNonceMutationVariables>(GenerateNonceDocument, options);
      }
export type GenerateNonceMutationHookResult = ReturnType<typeof useGenerateNonceMutation>;
export type GenerateNonceMutationResult = Apollo.MutationResult<GenerateNonceMutation>;
export type GenerateNonceMutationOptions = Apollo.BaseMutationOptions<GenerateNonceMutation, GenerateNonceMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    address
    projects {
      id
      name
    }
  }
}
    `;

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

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    