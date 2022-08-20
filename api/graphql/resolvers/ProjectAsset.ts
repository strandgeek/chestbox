import { Arg, Authorized, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { ProjectAsset } from '@generated/type-graphql'
import { Context } from "../../types/context";
import { Prisma } from "@prisma/client";

@InputType()
export class ProjectAssetCreateInput {
  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  imageUrl: string;

  @Field()
  description: string;

  @Field()
  properties: string;

  @Field()
  projectId: string;
}

@Resolver()
export class ProjectAssetResolver {
  @Authorized()
  @Mutation(() => ProjectAsset)
  async createProjectAsset(
    @Arg("input") input: ProjectAssetCreateInput,
    @Ctx() ctx: Context
  ): Promise<ProjectAsset | null> {
    const { me, prisma } = ctx
    if (!me) {
      return null
    }

    const project = await prisma.project.findUnique({
      where: {
        id: input.projectId,
      }
    })

    const projectAssetSlugCount = await prisma.projectAsset.count({
      where: {
        projectId: input.projectId,
        slug: input.slug,
      }
    })

    if (projectAssetSlugCount > 0) {
      throw new Error('Slug already exist for the project')
    }

    if (!project || project.ownerId !== me.id) {
      throw new Error('Unauthorized')
    }

    const projectAsset = await prisma.projectAsset.create({
      data: {
        ...input,
        properties: JSON.parse(input.properties) as Prisma.JsonArray,
      },
    })
    return projectAsset
  }
}
