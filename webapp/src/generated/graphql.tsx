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
  JSON: any;
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

export type ImageUploadInput = {
  imageBase64: Scalars['String'];
};

export type ImageUploadPayload = {
  __typename?: 'ImageUploadPayload';
  url: Scalars['String'];
};

export type JsonFilter = {
  array_contains?: InputMaybe<Scalars['JSON']>;
  array_ends_with?: InputMaybe<Scalars['JSON']>;
  array_starts_with?: InputMaybe<Scalars['JSON']>;
  equals?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<Scalars['JSON']>;
  path?: InputMaybe<Array<Scalars['String']>>;
  string_contains?: InputMaybe<Scalars['String']>;
  string_ends_with?: InputMaybe<Scalars['String']>;
  string_starts_with?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  auth: AuthPayload;
  createProject: Project;
  createProjectAsset: ProjectAsset;
  generateNonce: GenerateNoncePayload;
  uploadImage: ImageUploadPayload;
};


export type MutationAuthArgs = {
  input: AuthInput;
};


export type MutationCreateProjectArgs = {
  input: ProjectCreateInput;
};


export type MutationCreateProjectAssetArgs = {
  input: ProjectAssetCreateInput;
};


export type MutationGenerateNonceArgs = {
  input: GenerateNonceInput;
};


export type MutationUploadImageArgs = {
  input: ImageUploadInput;
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
  _count?: Maybe<ProjectCount>;
  apiToken: Scalars['String'];
  assets: Array<ProjectAsset>;
  id: Scalars['String'];
  name: Scalars['String'];
  owner: Account;
  ownerId: Scalars['String'];
};


export type ProjectAssetsArgs = {
  cursor?: InputMaybe<ProjectAssetWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProjectAssetScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProjectAssetOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectAssetWhereInput>;
};

export type ProjectAsset = {
  __typename?: 'ProjectAsset';
  description: Scalars['String'];
  id: Scalars['String'];
  imageUrl: Scalars['String'];
  metadataUri: Scalars['String'];
  name: Scalars['String'];
  projectId: Scalars['String'];
  properties: Scalars['JSON'];
  slug: Scalars['String'];
};

export type ProjectAssetCreateInput = {
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  projectId: Scalars['String'];
  properties: Scalars['String'];
  slug: Scalars['String'];
};

export type ProjectAssetListRelationFilter = {
  every?: InputMaybe<ProjectAssetWhereInput>;
  none?: InputMaybe<ProjectAssetWhereInput>;
  some?: InputMaybe<ProjectAssetWhereInput>;
};

export type ProjectAssetOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ProjectAssetOrderByWithRelationInput = {
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  imageUrl?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  project?: InputMaybe<ProjectOrderByWithRelationInput>;
  projectId?: InputMaybe<SortOrder>;
  properties?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
};

export enum ProjectAssetScalarFieldEnum {
  Description = 'description',
  Id = 'id',
  ImageUrl = 'imageUrl',
  Name = 'name',
  ProjectId = 'projectId',
  Properties = 'properties',
  Slug = 'slug'
}

export type ProjectAssetWhereInput = {
  AND?: InputMaybe<Array<ProjectAssetWhereInput>>;
  NOT?: InputMaybe<Array<ProjectAssetWhereInput>>;
  OR?: InputMaybe<Array<ProjectAssetWhereInput>>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  imageUrl?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  project?: InputMaybe<ProjectRelationFilter>;
  projectId?: InputMaybe<StringFilter>;
  properties?: InputMaybe<JsonFilter>;
  slug?: InputMaybe<StringFilter>;
};

export type ProjectAssetWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type ProjectCount = {
  __typename?: 'ProjectCount';
  assets: Scalars['Int'];
};

export type ProjectCreateInput = {
  name: Scalars['String'];
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
  apiToken?: InputMaybe<SortOrder>;
  assets?: InputMaybe<ProjectAssetOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  owner?: InputMaybe<AccountOrderByWithRelationInput>;
  ownerId?: InputMaybe<SortOrder>;
};

export type ProjectRelationFilter = {
  is?: InputMaybe<ProjectWhereInput>;
  isNot?: InputMaybe<ProjectWhereInput>;
};

export enum ProjectScalarFieldEnum {
  ApiToken = 'apiToken',
  Id = 'id',
  Name = 'name',
  OwnerId = 'ownerId'
}

export type ProjectWhereInput = {
  AND?: InputMaybe<Array<ProjectWhereInput>>;
  NOT?: InputMaybe<Array<ProjectWhereInput>>;
  OR?: InputMaybe<Array<ProjectWhereInput>>;
  apiToken?: InputMaybe<StringFilter>;
  assets?: InputMaybe<ProjectAssetListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  owner?: InputMaybe<AccountRelationFilter>;
  ownerId?: InputMaybe<StringFilter>;
};

export type ProjectWhereUniqueInput = {
  apiToken?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  assetInfoByApiToken: ProjectAsset;
  me?: Maybe<Account>;
  project?: Maybe<Project>;
};


export type QueryAssetInfoByApiTokenArgs = {
  apiToken: Scalars['String'];
  slug: Scalars['String'];
};


export type QueryProjectArgs = {
  id: Scalars['String'];
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

export type CreateProjectMutationVariables = Exact<{
  input: ProjectCreateInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, name: string } };

export type CreateProjectAssetMutationVariables = Exact<{
  input: ProjectAssetCreateInput;
}>;


export type CreateProjectAssetMutation = { __typename?: 'Mutation', createProjectAsset: { __typename?: 'ProjectAsset', id: string, name: string, imageUrl: string } };

export type GenerateNonceMutationVariables = Exact<{
  input: GenerateNonceInput;
}>;


export type GenerateNonceMutation = { __typename?: 'Mutation', generateNonce: { __typename?: 'GenerateNoncePayload', nonce: string } };

export type UploadImageMutationVariables = Exact<{
  input: ImageUploadInput;
}>;


export type UploadImageMutation = { __typename?: 'Mutation', uploadImage: { __typename?: 'ImageUploadPayload', url: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Account', id: string, address: string, projects: Array<{ __typename?: 'Project', id: string, name: string }> } | null };

export type ProjectQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string, assets: Array<{ __typename?: 'ProjectAsset', id: string, name: string, slug: string, description: string, projectId: string, properties: any, imageUrl: string, metadataUri: string }> } | null };

export type ProjectConfigQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProjectConfigQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string, name: string, apiToken: string } | null };


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
export const CreateProjectDocument = gql`
    mutation CreateProject($input: ProjectCreateInput!) {
  createProject(input: $input) {
    id
    name
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateProjectAssetDocument = gql`
    mutation CreateProjectAsset($input: ProjectAssetCreateInput!) {
  createProjectAsset(input: $input) {
    id
    name
    imageUrl
  }
}
    `;
export type CreateProjectAssetMutationFn = Apollo.MutationFunction<CreateProjectAssetMutation, CreateProjectAssetMutationVariables>;

/**
 * __useCreateProjectAssetMutation__
 *
 * To run a mutation, you first call `useCreateProjectAssetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectAssetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectAssetMutation, { data, loading, error }] = useCreateProjectAssetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectAssetMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectAssetMutation, CreateProjectAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectAssetMutation, CreateProjectAssetMutationVariables>(CreateProjectAssetDocument, options);
      }
export type CreateProjectAssetMutationHookResult = ReturnType<typeof useCreateProjectAssetMutation>;
export type CreateProjectAssetMutationResult = Apollo.MutationResult<CreateProjectAssetMutation>;
export type CreateProjectAssetMutationOptions = Apollo.BaseMutationOptions<CreateProjectAssetMutation, CreateProjectAssetMutationVariables>;
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
export const UploadImageDocument = gql`
    mutation UploadImage($input: ImageUploadInput!) {
  uploadImage(input: $input) {
    url
  }
}
    `;
export type UploadImageMutationFn = Apollo.MutationFunction<UploadImageMutation, UploadImageMutationVariables>;

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMutation, { data, loading, error }] = useUploadImageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadImageMutation, UploadImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument, options);
      }
export type UploadImageMutationHookResult = ReturnType<typeof useUploadImageMutation>;
export type UploadImageMutationResult = Apollo.MutationResult<UploadImageMutation>;
export type UploadImageMutationOptions = Apollo.BaseMutationOptions<UploadImageMutation, UploadImageMutationVariables>;
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
export const ProjectDocument = gql`
    query Project($id: String!) {
  project(id: $id) {
    id
    assets {
      id
      name
      slug
      description
      projectId
      properties
      imageUrl
      metadataUri
    }
  }
}
    `;

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectQuery(baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
      }
export function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const ProjectConfigDocument = gql`
    query ProjectConfig($id: String!) {
  project(id: $id) {
    id
    name
    apiToken
  }
}
    `;

/**
 * __useProjectConfigQuery__
 *
 * To run a query within a React component, call `useProjectConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectConfigQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectConfigQuery(baseOptions: Apollo.QueryHookOptions<ProjectConfigQuery, ProjectConfigQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectConfigQuery, ProjectConfigQueryVariables>(ProjectConfigDocument, options);
      }
export function useProjectConfigLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectConfigQuery, ProjectConfigQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectConfigQuery, ProjectConfigQueryVariables>(ProjectConfigDocument, options);
        }
export type ProjectConfigQueryHookResult = ReturnType<typeof useProjectConfigQuery>;
export type ProjectConfigLazyQueryHookResult = ReturnType<typeof useProjectConfigLazyQuery>;
export type ProjectConfigQueryResult = Apollo.QueryResult<ProjectConfigQuery, ProjectConfigQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    