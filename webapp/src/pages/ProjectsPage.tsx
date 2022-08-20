import React, { FC } from "react";
import { AppLayout } from "../layouts/AppLayout";
import { Link } from 'react-router-dom'

export interface ProjectsPageProps {}

export const ProjectsPage: FC<ProjectsPageProps> = (props) => {
  return (
    <AppLayout>
      <div className="mx-auto max-w-xl mt-12">
        <div className="p-4">
          <div className="font-bold p-2 pb-4">Select a Project</div>
          <ul className="menu menu-compact lg:menu-normal bg-base-300 w-full p-2 rounded-box">
            {[0, 1, 2].map((addr: number) => (
              <li>
                <button onClick={() => null}>Project 1</button>
              </li>
            ))}
          </ul>
          <Link className="btn btn-primary mt-4 w-full" to="/app/projects/create">
            Create Project
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};
