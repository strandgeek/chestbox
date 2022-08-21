import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { ProjectAsset, MintedProjectAsset } from '@generated/type-graphql'
import { Context } from "../../types/context";

@InputType()
export class MintedProjectAssetCreateInput {
  @Field()
  slug: string;

  @Field()
  assetID: number;

  @Field()
  txnID: string;

  @Field()
  to: string;
}

@Resolver()
export class ProjectAPIResolver {

  @Query(() => ProjectAsset)
  async assetInfoByApiToken(
    @Arg("apiToken") apiToken: string,
    @Arg("slug") slug: string,
    @Ctx() ctx: Context
  ): Promise<ProjectAsset | null> {
    const { prisma } = ctx

    const project = await prisma.project.findUnique({
      where: {
        apiToken,
      }
    })

    if (!project) {
      throw new Error('Forbidden')
    }

    const projectAsset = await prisma.projectAsset.findFirstOrThrow({
      where: {
        projectId: project.id,
        slug: slug,
      }
    })

    return projectAsset
  }

  @Query(() => MintedProjectAsset)
  async mintedAssetInfoByApiToken(
    @Arg("apiToken") apiToken: string,
    @Arg("assetID") assetID: number,
    @Ctx() ctx: Context
  ): Promise<MintedProjectAsset | null> {
    const { prisma } = ctx

    const project = await prisma.project.findUnique({
      where: {
        apiToken,
      }
    })

    if (!project) {
      throw new Error('Forbidden')
    }

    const mintedProjectAsset = await prisma.mintedProjectAsset.findFirstOrThrow({
      where: {
        projectId: project.id,
        assetID,
      }
    })

    return mintedProjectAsset
  }

  @Mutation(() => MintedProjectAsset)
  async createMintedProjectAssetByApiToken(
    @Arg("input") input: MintedProjectAssetCreateInput,
    @Arg("apiToken") apiToken: string,
    @Ctx() ctx: Context
  ): Promise<MintedProjectAsset | null> {
    const { prisma } = ctx

    const project = await prisma.project.findUnique({
      where: {
        apiToken,
      }
    })

    if (!project) {
      throw new Error('Forbidden')
    }

    const projectAsset = await prisma.projectAsset.findFirstOrThrow({
      where: {
        projectId: project.id,
        slug: input.slug,
      }
    })

    if (!project) {
      throw new Error('Not Found')
    }

    const mintedProjectAsset = await prisma.mintedProjectAsset.create({
      data: {
        assetID: input.assetID,
        txnID: input.txnID,
        to: input.to,
        projectId: project.id,
        projectAssetId: projectAsset.id,
      }
    })

    return mintedProjectAsset
  }
}
