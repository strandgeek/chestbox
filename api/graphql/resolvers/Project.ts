import { Arg, Authorized, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Project } from '@generated/type-graphql'
import { Context } from "../../types/context";

@InputType()
export class ProjectCreateInput {
  @Field()
  name: string;
}

@Resolver()
export class ProjectResolver {
  @Authorized()
  @Mutation(() => Project)
  async createProject(
    @Arg("input") input: ProjectCreateInput,
    @Ctx() ctx: Context
  ): Promise<Project | null> {
    const { me, prisma } = ctx
    if (!me) {
      return null
    }
    const project = await prisma.project.create({
      data: {
        name: input.name,
        ownerId: me.id,
      }
    })
    return project
  }

  @Authorized()
  @Query(() => Project, { nullable: true})
  async project(
    @Arg("id") id: string,
    @Ctx() ctx: Context
  ): Promise<Project | null> {
    const { me, prisma } = ctx
    if (!me) {
      return null
    }
    return prisma.project.findUniqueOrThrow({
      where: {
        id,
      }
    })
  }
}
