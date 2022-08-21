import { ExternalLinkIcon, PlusIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PropertyField } from "../components/PropertiesInput";
import { ProjectAsset, useProjectQuery } from "../generated/graphql";
import { AppLayout } from "../layouts/AppLayout";

export interface ProjectViewPageProps {}

export const ProjectViewPage: FC<ProjectViewPageProps> = (props) => {
  const [currentAssetPreview, setCurrentAssetPreview] = useState<ProjectAsset>()
  const params = useParams()
  const { data: projectData } = useProjectQuery({
    variables: {
      id: params.projectId!,
    }
  })
  useEffect(() => {
    if (projectData?.project?.assets?.length) {
      setCurrentAssetPreview(projectData?.project?.assets[0] as any)
    }
  }, [projectData])
  const project = projectData?.project || { assets: []} 
  const tiles = Array.from(Array(800 - project.assets.length).keys());
  const col = 10;
  return (
    <AppLayout>
      <div className="mx-auto max-w-6xl pb-24">
        <div className="grid grid-cols-2 space-x-8 mt-8">
          <div>
            <div className="flex justify-between">
              <h2 className="text-3xl mb-4">Assets</h2>
              <a className="btn btn-primary btn-sm" href={`/app/projects/${params.projectId}/assets/create`}>
                <PlusIcon className="h-5 w-5 mr-2" />
                Create
              </a>
            </div>
            <div className="bg-base-200 rounded-md shadow-xs p-3 h-full">
              <div className="grid grid-cols-10 max-h-[600px] overflow-y-auto">
                {project.assets.map((a) => {
                  const className = classNames(
                    'w-12 h-12 bg-base-300 m-2 shrink-0 p-2',
                    {
                      'border-2 border-base-100 cursor-pointer': currentAssetPreview?.slug !== a.slug,
                      'border-2 border-yellow-700': currentAssetPreview?.slug === a.slug,
                    }
                  )
                  console.log(currentAssetPreview?.slug === a.slug)
                  return (
                    <div className="flex items-center justify-center">
                      <button className={className} onClick={() => setCurrentAssetPreview(a as any)}>
                        <img src={a.imageUrl} className="w-full h-full" />
                      </button>
                    </div>
                  )
                })}
                {tiles.map((t) => (
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 bg-base-300 m-2 shrink-0 border-2 border-base-100"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl mb-4">Preview</h2>
            <div className="bg-base-200 rounded-md shadow-xs p-8 h-full">
              <div className="flex">
                <div className="avatar">
                  <div className="w-24 rounded bg-base-300 shrink-0 border-2 border-base-100 p-2">
                    <img src={currentAssetPreview?.imageUrl} />
                  </div>
                </div>
                <div className="ml-4">
                <a href={currentAssetPreview?.metadataUri} className="text-sm text-primary flex items-center">
                      View Metadata
                      <ExternalLinkIcon className="h-4 w-5 ml-1" />
                    </a>
                  <h3 className="text-2xl">{currentAssetPreview?.name}</h3>
                  <div>
                    <span className="opacity-60 mr-2">{currentAssetPreview?.slug}</span>
                  </div>
                  <div>
                  </div>
                </div>
              </div>
              {currentAssetPreview?.description && currentAssetPreview.description !== "" && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-2">Description</h3>
                  <p>
                    {currentAssetPreview?.description}
                  </p>
                </div>
              )}
              <div className="mt-8">
                {currentAssetPreview?.properties?.fields && currentAssetPreview?.properties?.fields.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-2">Properties</h3>
                    <div className="overflow-x-auto">
                      <table className="table w-full">
                        <tbody>
                          {(currentAssetPreview?.properties?.fields || []).map((f: PropertyField) => (
                            <tr>
                              <td>{f.name}</td>
                              <td>{f.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
