import { useState } from "react"

export interface UseWallet {
  address: string | null
  connect: () => Promise<void>
}

export const useWallet = (): UseWallet => {
  const [address, setAddress] = useState<string | null>(null);
  const connect = async () => {
    const { AlgoSigner } = window
    await AlgoSigner.connect()
    const accounts = await AlgoSigner.accounts({
      ledger: 'TestNet'
    })
    setAddress(accounts[0].address)
  }
  return {
    address,
    connect,
  }
}
