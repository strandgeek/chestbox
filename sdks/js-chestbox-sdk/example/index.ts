import algosdk from 'algosdk'
import dotenv from 'dotenv'
import { ChestBoxSDK } from '../dist'

// Init .env file
dotenv.config()

// Algod Config
const server = process.env.PURESTAKE_SERVER!
const token = { "X-API-Key": process.env.PURESTAKE_TOKEN! };
const port = "";
const algodClient = new algosdk.Algodv2(token, server, port);

// ChestBox Config
const apiToken = process.env.CHESTBOX_API_TOKEN!
const apiUri = process.env.CHESTBOX_API_URI!
const minterMnemonic = process.env.CHESTBOX_MINTER_MNEMONIC!

const chestbox = new ChestBoxSDK({
  algodClient,
  apiToken,
  apiUri,
  minterAccount: algosdk.mnemonicToSecretKey(minterMnemonic)
})

chestbox.mintAsset({
  slug: 'super-sword',
  to: 'DNKRBWSS3GF57WGRR7OMG6DUS2EHPMYLJ364LOCJG6C5FBZKX4DMKVKS3Y',
}).then(console.log).catch(console.log)
