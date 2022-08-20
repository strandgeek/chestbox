import { PlusIcon } from "@heroicons/react/outline";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";

export interface ProjectViewPageProps {}

export const ProjectViewPage: FC<ProjectViewPageProps> = (props) => {
  const params = useParams()
  const tiles = Array.from(Array(800).keys());
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
                  <div className="w-24 rounded">
                    <img src="https://placeimg.com/192/192/people" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl">My Super Sword</h3>
                  <div>
                    <span className="opacity-60 mr-2">my-syper-sword</span>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-2">Description</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  lacinia ornare dui. Duis at nunc mattis, dapibus ligula ut,
                  imperdiet purus. Duis vestibulum vestibulum sodales.
                </p>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-2">Properties</h3>
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <tbody>
                      <tr>
                        <td>Level</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>Attack</td>
                        <td>480</td>
                      </tr>
                      <tr>
                        <td>Weigth</td>
                        <td>54</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
