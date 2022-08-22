import dotenv from 'dotenv'
dotenv.config()
import algosdk from 'algosdk'
import express, {Request, Response, Router } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { ChestBoxSDK } from '@strandgeek/chestbox-sdk'
import { algodClient } from './utils/algod'


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

const app = express()
app.use(bodyParser.json())
app.use(cors())
const api = Router()
app.use('/api', api)

// Step 1 - This endpoint is used to show a item preview on frontend
api.get('/assets/:slug', async (req: Request, res: Response) => {
  try {    
    const asset = await chestbox.getAsset(req.params.slug)
    return res.json(asset)
  } catch (error) {
    res.status(500).json({
      'error': 'Internal Server Error',
    })
  }
})

// Step 2 - This endpoint is used to claim (mint) an asset by slug
api.post('/claim', async (req: Request, res: Response) => {
  /*
   Here you check if the player meets the eligibility requirements to claim the item.
   For this demonstration, we are allowing any player to claim any item.

   Also, we don't have authorization/login system in this demo, so to simplify
   we are passing the wallet address as parameter.
  */
  try {   
    const data: {
      address: string;
      slug: string;
    } = req.body
    const result = await chestbox.claimAsset({
      slug: data.slug,
      to: data.address,
    })
    res.json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      'error': 'Internal Server Error',
    })
  }
})

// Step 3 - This endpoint is used to complete the claim (transfer the token) to player's wallet
api.post('/complete-claim', async (req: Request, res: Response) => {
  /*
    To receive the token, the player should opt-in the asset id.
    Once the player opted-in the token on frontend, we call this endpoint to transfer the token
  */
  try {   
    const data: {
      assetID: number;
    } = req.body
    const result = await chestbox.completeClaimAsset({
      assetID: data.assetID,
    })
    res.json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      'error': 'Internal Server Error',
    })
  }
})


const SERVER_PORT = 9090
app.listen(SERVER_PORT, () => {
  console.log(`Game Demo API listening on port ${SERVER_PORT}...`)
})
