import { GraphQLClient } from 'graphql-request'

export const createApiClient = (uri: string): GraphQLClient => {
  return new GraphQLClient(uri, { headers: {} })
}
