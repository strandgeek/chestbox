import React, { FC } from "react";
import { AppLayout } from "../layouts/AppLayout";
import { Link } from 'react-router-dom'

export interface CreateProjectPageProps {}

export const CreateProjectPage: FC<CreateProjectPageProps> = (props) => {
  return (
    <AppLayout>
      <div className="mx-auto max-w-xl mt-12">
        <div className="p-4 bg-base-300">
          <div className="font-bold p-2 pb-4">Create a Project</div>
          <input type="text" placeholder="Project Name" className="my-6 input input-bordered w-full" />
          <Link className="btn btn-primary mt-4 w-full" to="/app/projects/create">
            Create
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};
