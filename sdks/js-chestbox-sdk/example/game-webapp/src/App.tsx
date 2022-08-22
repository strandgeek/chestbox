import {
  CheckCircleIcon,
  ExternalLinkIcon,
  SparklesIcon,
} from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { client } from "./client";
import { useWallet } from "./hooks/useWallet";
import { Asset } from "./types/asset";
import { algoClient } from "./algo";
import algosdk from "algosdk";
import { confettiAnimate } from "./utils/confettiAnimate";

const PRIZE_ASSET_SLUG = "ahlspiess";

function App() {
  const { connect, address } = useWallet();
  const [asset, setAsset] = useState<Asset>();
  const [claiming, setClaiming] = useState(false);
  const [claimedTx, setClaimedTx] = useState<string>();
  useEffect(() => {
    (async () => {
      const res = await client.get<Asset>(`/assets/${PRIZE_ASSET_SLUG}`);
      setAsset(res.data);
    })();
  }, []);

  const claimItem = async () => {
    setClaiming(true);
    try {
      const res = await client.post<{
        txID: string;
        assetID: number;
      }>("/claim", {
        slug: PRIZE_ASSET_SLUG,
        address,
      });
      console.log(res);
      const { assetID } = res.data;
      await optInToken(assetID);
      const completeRes = await client.post("/complete-claim", {
        assetID,
      });
      confettiAnimate()
      setClaimedTx(completeRes.data.txnID);
    } catch (error) {
      console.log(error);
    }
    setClaiming(false);
  };

  const optInToken = async (assetID: number) => {
    if (!address) {
      return;
    }
    const { AlgoSigner } = window;
    const params = await algoClient.getTransactionParams().do();
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: address,
      to: address,
      assetIndex: assetID,
      note: AlgoSigner.encoding.stringToByteArray("Opt-In My RPG Game Token"),
      amount: 0,
      suggestedParams: params,
    });
    const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
    const signedTxs = await AlgoSigner.signTxn([{ txn: txn_b64 }]);
    const tx = await AlgoSigner.send({
      ledger: "TestNet",
      tx: signedTxs[0].blob,
    });
    console.log(tx);
  };

  if (!address) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="flex flex-col items-center justify-center">
          <img src="/chestbox-logo.png" className="h-12 mb-20" />
          <h2 className="text-4xl">
            ChestBox Game Demo
          </h2>
          <p className="my-8">
            To win the battle, you just need to connect your AlgoSigner wallet 😄
          </p>
          <button onClick={connect} className="btn btn-primary mt-4">
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="text-center">
        <div className="flex w-full justify-center">
          <SparklesIcon className="h-20 w-20 text-yellow-400 mb-4" />
        </div>
        <h1 className="text-5xl text-yellow-500 text-center">
          Congratulations!
        </h1>
        <div className="mt-8 text-2xl">You won the battle!</div>

        <div className="mt-8">As a prize you won an item: {asset?.name}</div>
        <div className="avatar mt-12">
          <div className="w-24 rounded-md ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={asset?.imageUrl} className="p-4" />
          </div>
        </div>
        <div className="opacity-80 mt-2">{asset?.name}</div>
        {!claimedTx ? (
          <button
            disabled={claiming}
            onClick={claimItem}
            className={`btn btn-primary mt-8 ${claiming ? "loading" : ""}`}
          >
            {claiming ? 'Claiming Item...' : 'Claim Item'}
          </button>
        ) : (
          <div>
            <div className="text-green-500 flex items-center justify-center mt-8">
              <CheckCircleIcon className="h-6 w-6 mr-2" />
              Item claimed successfully!
            </div>
            <div>
              <a
                href={`https://testnet.algoexplorer.io/tx/${claimedTx}`}
                className="flex items-center justify-center text-blue-500 mt-4"
                target="_blank"
                rel="noreferrer"
              >
                View on Explorer
                <ExternalLinkIcon className="h-5 w-5 ml-1" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
