import { Arg, Authorized, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";
import { Project } from '@generated/type-graphql'
import { Context } from "../../types/context";
import { uploadImageToIPFS } from "../../src/ipfs";
import { uploadToS3 } from "../../src/utils/uploadToS3";

@InputType()
export class ImageUploadInput {
  @Field()
  imageBase64: string;
}

@ObjectType()
export class ImageUploadPayload {
  @Field()
  url: string
}

@Resolver()
export class ImageResolver {
  @Authorized()
  @Mutation(() => ImageUploadPayload)
  async uploadImage(
    @Arg("input") input: ImageUploadInput,
    @Ctx() ctx: Context
  ): Promise<ImageUploadPayload | null> {
    const { me, prisma } = ctx
    if (!me) {
      return null
    }
    const res = await uploadToS3(input.imageBase64)
    return {
      url: res.Location.replace('.s3.', '.s3.us-east-1.'),
    }
  }
}
