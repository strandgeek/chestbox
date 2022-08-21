import algosdk from "algosdk";

const server = process.env.REACT_APP_PURESTAKE_SERVER
const token = { "X-API-Key": process.env.REACT_APP_PURESTAKE_TOKEN! };
const port = "";

export const algoClient = new algosdk.Algodv2(token, server, port);
