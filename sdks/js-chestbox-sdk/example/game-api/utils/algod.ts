import algosdk from "algosdk";

const server = process.env.PURESTAKE_SERVER!
const token = { "X-API-Key": process.env.PURESTAKE_TOKEN! };
const port = "";
export const algodClient = new algosdk.Algodv2(token, server, port);
