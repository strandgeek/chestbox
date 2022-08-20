import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { Context } from "../../types/context";
import { Account } from '@generated/type-graphql'
import NodeCache from "node-cache";
import { randomUUID } from "crypto";
import { algoClient } from "../../algo";
import { decodeSignedTransaction } from "algosdk";


const nonceCache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

@InputType()
export class GenerateNonceInput {
  @Field()
  address: string;
}

@ObjectType()
export class GenerateNoncePayload {
  @Field()
  nonce: string;
}

@InputType()
export class AuthInput {
  @Field()
  signedTxBase64: string;

  @Field()
  pubKey: string;
}

@ObjectType()
export class AuthPayload {
  @Field()
  token: string;
}


@Resolver()
export class AuthResolver {
  @Query(() => Account, { nullable: true })
  async me(@Ctx() { prisma }: Context): Promise<Account | null> {
    return await prisma.account.findUnique({
      where: { address: '1234' },
    });
  }

  @Mutation(() => GenerateNoncePayload)
  async generateNonce(
    @Arg("input") input: GenerateNonceInput
  ): Promise<GenerateNoncePayload> {
    const nonce = randomUUID()
    nonceCache.set(input.address, nonce)
    return {
      nonce,
    }
  }

  @Mutation(() => GenerateNoncePayload)
  async auth(
    @Arg("input") input: AuthInput
  ): Promise<AuthPayload> {
    const txBuffer = Buffer.from(input.signedTxBase64, "base64")
    const decoded = decodeSignedTransaction(txBuffer)
    console.log(decoded.txn.from)
    return {
      token: '123',
    }
  }
}
