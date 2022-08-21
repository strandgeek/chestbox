import { ExternalLinkIcon } from "@heroicons/react/outline";
import moment from "moment";
import { FC } from "react";
import { useParams } from "react-router-dom";
import {
  SortOrder,
  useProjectMintedAssetsQuery,
} from "../generated/graphql";
import { AppLayout } from "../layouts/AppLayout";

export interface ProjectMintedAssetsProps {}

export const ProjectMintedAssets: FC<ProjectMintedAssetsProps> = (props) => {
  const params = useParams();
  const { data } = useProjectMintedAssetsQuery({
    variables: {
      projectId: params.projectId!,
      orderBy: {
        createdAt: SortOrder.Desc
      }
    },
  });
  const project = data?.project;
  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl mt-16">
        <h3 className="text-3xl mb-8">Minted Tokens</h3>

        {project && (
          <div>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Asset</th>
                    <th>Slug</th>
                    <th>Created At</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {project.mintedProjectAssets.map((mpa) => (
                    <tr>
                      <th>{mpa.assetID}</th>
                      <td>
                        <div className="flex items-center">
                          <div className="avatar mr-2">
                            <div className="w-7 rounded-sm bg-base-300 shrink-0 border-2 border-base-100">
                              <img
                                src={mpa.projectAsset.imageUrl}
                                alt={mpa.projectAsset.name}
                                className="p-1"
                              />
                            </div>
                          </div>
                          {mpa.projectAsset.name}
                        </div>
                      </td>
                      <td>{mpa.projectAsset.slug}</td>
                      <td>{moment(mpa.createdAt).fromNow()}</td>
                      <td>
                        <a
                          href={`https://testnet.algoexplorer.io/asset/${mpa.assetID}`}
                          className="text-primary flex items-center"
                          target="_blank"
                          rel="noreferrer"
                        >
                          View on Explorer{" "}
                          <ExternalLinkIcon className="w-4 h-4 ml-1" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};
