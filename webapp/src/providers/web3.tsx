import React, { createContext, FC, useContext, useEffect, useState } from "react"
import { BasicProvider } from "react-web3-daisyui"
import { EthProvider } from "react-web3-daisyui/dist/eth"
import { providers } from 'ethers'
import Web3Modal from 'web3modal'

const web3Modal = new Web3Modal({
  cacheProvider: true, // very important
  network: "mainnet",
});

export interface Web3Context {
  ethersProvider?: providers.Web3Provider
  accountAddress?: string
  chainId?: number
  connectWallet: () => Promise<any>
  loading?: boolean
}

export const web3Context = createContext<Web3Context>({
  connectWallet: () => Promise.resolve(),
  loading: false,
})

export const Web3ComponentsProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ethersProvider, accountAddress, chainId } = useContext(web3Context)
  return (
    <BasicProvider value={{}}>
      <EthProvider value={{ ethersProvider, accountAddress, chainId }}>
        {children}
      </EthProvider>
    </BasicProvider>
  )
}

export const Web3Provider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ethersProvider, setEthersProvider] = useState<providers.Web3Provider>()
  const [accountAddress, setAccountAddress] = useState<string>()
  const [chainId, setChainId] = useState<number>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if(web3Modal && web3Modal.cachedProvider){
      connectWallet()
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    (async () => {
      if (!ethersProvider) {
        return
      }
      window.ethereum.on("accountsChanged", async function (accounts: any) {
        if (accounts[0]) {
          setAccountAddress(accounts[0]);
        } else {
          await web3Modal.clearCachedProvider();
          setAccountAddress(undefined);
        }
      });
      window.ethereum.on("chainChanged", async function () {
        window.location.reload()
      });
    })();
  }, [ethersProvider]);

  const connectWallet = async () => {
    if (!web3Modal) {
      return;
    }
    const provider = await web3Modal.connect();
    const ethersProvider = new providers.Web3Provider(provider);
    const accountAddress = await ethersProvider.getSigner().getAddress();
    const network = await ethersProvider.getNetwork()
    setEthersProvider(ethersProvider)
    setAccountAddress(accountAddress)
    setChainId(network.chainId)
    setLoading(false)
  }


  
  return (
    <web3Context.Provider value={{ ethersProvider, accountAddress, chainId, connectWallet, loading }}>
      <Web3ComponentsProvider>
        {children}
      </Web3ComponentsProvider>
    </web3Context.Provider>
  )
}
