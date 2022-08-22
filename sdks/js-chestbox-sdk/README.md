# ChestBox NodeJS SDK


### Quick Start

#### Installing

```bash
npm i @strandgeek/chestbox-sdk
```

#### Example
- [See a full example source-code](https://github.com/strandgeek/chestbox/tree/main/sdks/js-chestbox-sdk/example)
- [See a live demo](https://demo.chestbox.io)


#### Usage

```typescript
const chestbox = new ChestBoxSDK({
  algodClient: <YOUR_ALGO_CLIENT>,
  apiToken: <YOUR_CHESTBOX_PROJECT_TOKEN>,
  minterAccount: algosdk.mnemonicToSecretKey(<MINTER_MNEMONIC>)
})
```

> Note: Make sure your minter account has enough algorands to pay the fees

### Claim an Asset to a Player

When you want to give an asset to the player in the game, you call this command

```typescript
const { assetID } = await chestbox.claimAsset({
  slug: 'super-sword',
  to: <PLAYER_WALLET_ADDRESS>,
})
```

### Complete Claim

After the player opt-in step, you can complete the claim (transfer the token from minter to player wallet)

```typescript
const result = await chestbox.completeClaimAsset({
  assetID,
})
```
