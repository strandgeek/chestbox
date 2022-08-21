import algosdk from 'algosdk'
import { gql, GraphQLClient } from 'graphql-request'
import { createApiClient } from './client'

const GET_ASSET_URI_BY_SLUG_QUERY = gql`
  query AssetInfoByApiToken($slug: String!, $apiToken: String!) {
    asset: assetInfoByApiToken(slug: $slug, apiToken: $apiToken) {
      id
      name
      imageUrl
      projectId
      properties
      slug
      metadataUri
    }
  }
`

export interface ChestBoxSDKOptions {
  apiToken: string
  apiUri: string
  algodClient: algosdk.Algodv2
  minterAccount: algosdk.Account
}

export interface MintAssetOptions {
  slug: string
  to: string
}

export interface MintAssetPayload {
  txId: string
}

export class ChestBoxSDK {
  apiToken: string
  algodClient: algosdk.Algodv2
  minterAccount: algosdk.Account
  apiClient: GraphQLClient
  constructor(opts: ChestBoxSDKOptions) {
    this.apiToken = opts.apiToken
    this.algodClient = opts.algodClient
    this.apiClient = createApiClient(opts.apiUri)
    this.minterAccount = opts.minterAccount
  }

  private async getAssetMetadataUriBySlug(slug: string): Promise<string> {
    try {
      const res = await this.apiClient.request(GET_ASSET_URI_BY_SLUG_QUERY, {
        slug,
        apiToken: this.apiToken,
      })
      const { asset } = res
      return asset.metadataUri
    } catch (error) {
      throw error
    }
  }

  async waitForConfirmation(txId, timeout) {
    // Wait until the transaction is confirmed or rejected, or until 'timeout'
    // number of rounds have passed.
    //     Args:
    // txId(str): the transaction to wait for
    // timeout(int): maximum number of rounds to wait
    // Returns:
    // pending transaction information, or throws an error if the transaction
    // is not confirmed or rejected in the next timeout rounds
    if (this.algodClient == null || txId == null || timeout < 0) {
      throw new Error('Bad arguments.');
    }
    const status = await this.algodClient.status().do();
    if (typeof status === 'undefined')
      throw new Error('Unable to get node status');
    const startround = status['last-round'] + 1;
    let currentround = startround;
  
    /* eslint-disable no-await-in-loop */
    while (currentround < startround + timeout) {
      const pendingInfo = await this.algodClient
        .pendingTransactionInformation(txId)
        .do();
      if (pendingInfo !== undefined) {
        if (
          pendingInfo['confirmed-round'] !== null &&
          pendingInfo['confirmed-round'] > 0
        ) {
          // Got the completed Transaction
          return pendingInfo;
        }
  
        if (
          pendingInfo['pool-error'] != null &&
          pendingInfo['pool-error'].length > 0
        ) {
          // If there was a pool error, then the transaction has been rejected!
          throw new Error(
            `Transaction Rejected pool error${pendingInfo['pool-error']}`
          );
        }
      }
      await this.algodClient.statusAfterBlock(currentround).do();
      currentround += 1;
    }
    /* eslint-enable no-await-in-loop */
    throw new Error(`Transaction not confirmed after ${timeout} rounds!`);
  }

  async mintAsset({ slug, to }: MintAssetOptions): Promise<MintAssetPayload> {
    const assetUrl = await this.getAssetMetadataUriBySlug(slug)
    const params = await this.algodClient.getTransactionParams().do();
    const creator = this.minterAccount.addr;
    const defaultFrozen = false;
    const manager = creator;
    const reserve = creator;
    const freeze = creator;
    const clawback = creator;
    let assetMetadataHash = undefined;
    const decimals = 0;
    const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
        creator,
        undefined,
        1,
        decimals,
        defaultFrozen,
        manager,
        reserve,
        freeze,
        clawback,
        "NFT",
        "ChestBoxNFT",
        assetUrl,
        assetMetadataHash,
        params,
    );
    const signedTxn = algosdk.signTransaction(txn, this.minterAccount.sk);
    const tx = await this.algodClient.sendRawTransaction(signedTxn.blob).do();
    await this.waitForConfirmation(tx.txId, 10)
    return {
      txId: tx.txId,
    }
  }
}
