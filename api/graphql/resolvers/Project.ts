import { Arg, Authorized, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import algosdk, { decodeSignedTransaction } from "algosdk";
import { sign } from 'jsonwebtoken'
import { Project } from '@generated/type-graphql'
import { AuthPayload } from "./Auth";
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
}
