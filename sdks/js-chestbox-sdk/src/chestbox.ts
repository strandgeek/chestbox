import algosdk from 'algosdk'
import { gql, GraphQLClient } from 'graphql-request'
import { createApiClient } from './client'

export interface Asset {
  id: string;
  description: string;
  imageUrl: string;
  metadataUri: string;
  name: string;
  projectId: string;
  properties: {
    fields: {
      type: string;
      name: string;
      value: string;
    }[]
  };
  slug: string;
}


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

const GET_MINTED_ASSET_BY_ID_QUERY = gql`
  query MintedAssetInfoByApiToken($assetID: Float!, $apiToken: String!) {
    mintedAsset: mintedAssetInfoByApiToken(assetID: $assetID, apiToken: $apiToken) {
      id
      to
    }
  }
`

const CREATE_MINTED_ASSET_MUTATION = gql`
  mutation CreateMintedProjectAssetByApiToken($apiToken: String!, $input: MintedProjectAssetCreateInput!) {
    createMintedProjectAssetByApiToken(apiToken: $apiToken, input: $input) {
      id
      assetID
      projectId
      to
      txnID
    }
  }
`

export interface ChestBoxSDKOptions {
  apiToken: string
  apiUri?: string
  algodClient: algosdk.Algodv2
  minterAccount: algosdk.Account
}

export interface MintAssetOptions {
  slug: string
  to: string
}

export interface MintAssetPayload {
  txnID: string
  assetID: number
}

export class ChestBoxSDK {
  apiToken: string
  algodClient: algosdk.Algodv2
  minterAccount: algosdk.Account
  apiClient: GraphQLClient
  constructor(opts: ChestBoxSDKOptions) {
    this.apiToken = opts.apiToken
    this.algodClient = opts.algodClient
    this.apiClient = createApiClient(opts.apiUri || 'https://chestbox.io/graphql')
    this.minterAccount = opts.minterAccount
  }

  async getAsset(slug: string): Promise<Asset> {
    try {
      const res = await this.apiClient.request(GET_ASSET_URI_BY_SLUG_QUERY, {
        apiToken: this.apiToken,
        slug,
      })
      const { asset } = res
      return asset
    } catch (error) {
      throw error
    }
  }

  async getMintedAsset(assetID: number): Promise<{ id: string, to: string }> {
    try {
      const res = await this.apiClient.request(GET_MINTED_ASSET_BY_ID_QUERY, {
        apiToken: this.apiToken,
        assetID,
      })
      const { mintedAsset } = res
      return mintedAsset
    } catch (error) {
      throw error
    }
  }

  /**
   * Create internal record of minted token on ChestBox platform
   * This method is used to keep tracking all tokens minted on Game-Server
   * @param  string slug The asset slug
   * @param  string to the player asset
   * @param  string txnID the mint transaction id
   * @param  string the minted token assetID
  */
  private async createMintedAsset({
    slug,
    to,
    txnID,
    assetID,
  }: {
    slug: string,
    to: string,
    txnID: string,
    assetID: string,
  }): Promise<Asset> {
    try {
      const res = await this.apiClient.request(CREATE_MINTED_ASSET_MUTATION, {
        apiToken: this.apiToken,
        input: {
          slug,
          to,
          txnID,
          assetID,
        },
      })
      const { asset } = res
      return asset
    } catch (error) {
      throw error
    }
  }

  /**
   * Claim a asset to a player
   * This method will mint an NFT token and save the user address (to), so it can be transferred after opt-in
   * @param  string slug The asset slug
   * @returns {Promise} the claimed asset info
  */
  async claimAsset({ slug, to }: MintAssetOptions): Promise<MintAssetPayload> {
    const asset = await this.getAsset(slug)
    const assetUrl = asset.metadataUri
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
    const txnID = tx.txId
    const ptx = await algosdk.waitForConfirmation(this.algodClient, txnID, 4);
    const assetID = ptx["asset-index"];
    await this.createMintedAsset({
      assetID,
      slug,
      to,
      txnID,
    })
    return {
      txnID,
      assetID,
    }
  }

  /**
   * Complete the asset claim after the user opt-in in frontend
   * @param  number assetID The assetID to be transferred to the player
   * @returns {Promise} the transfer transaction info
   */
  async completeClaimAsset({ assetID }: { assetID: number }): Promise<{ txnID: string }> {
    const mintedAsset = await this.getMintedAsset(assetID)
    console.log(`Transfering assetID=${assetID} to address=${mintedAsset.to}...`)
    const params = await this.algodClient.getTransactionParams().do();
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: this.minterAccount.addr,
      to: mintedAsset.to,
      assetIndex: assetID,
      amount: 1,
      suggestedParams: params,
    });
    const signedTxn = algosdk.signTransaction(txn, this.minterAccount.sk);
    const tx = await this.algodClient.sendRawTransaction(signedTxn.blob).do();
    const txnID = tx.txId
    const ptx = await algosdk.waitForConfirmation(this.algodClient, txnID, 4);
    return {
      txnID
    }
  }
}
