import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { ProjectAsset } from '@generated/type-graphql'
import { Context } from "../../types/context";

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
}
