import { useContext } from "react";
import { web3Context, Web3Context } from "../providers/web3";

export const useWeb3 = (): Web3Context => useContext(web3Context);
