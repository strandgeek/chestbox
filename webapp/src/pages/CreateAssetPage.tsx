import React, { FC, useState } from "react";
import { AppLayout } from "../layouts/AppLayout";
import { useNavigate, useParams } from "react-router-dom";
// import { useCreateAssetMutation } from "../generated/graphql";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { UploadIcon } from "@heroicons/react/outline";
import { PropertiesInput, PropertyField } from "../components/PropertiesInput";
import { useCreateProjectAssetMutation, useUploadImageMutation } from "../generated/graphql";
import { PLACEHOLDER_IMAGE } from "../consts";
import slugify from "slugify";

export interface CreateAssetPageProps {}


interface FormData {
  name: string;
  slug: string;
  imageUrl: string;
  description: string;
}

const getBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    resolve(reader.result?.toString() || '');
  };
  reader.onerror = function (error) {
    reject(error)
  }
})

export const CreateAssetPage: FC<CreateAssetPageProps> = (props) => {
  const navigate = useNavigate();
  const params = useParams()
  const [createProjectAsset] = useCreateProjectAssetMutation()
  const { register, handleSubmit, setValue, getValues } = useForm<FormData>({
    defaultValues: {
      imageUrl: PLACEHOLDER_IMAGE,
    }
  });
  const [uploadImage, { loading: uploading }] = useUploadImageMutation()
  const [fields, setFields] = useState<PropertyField[]>([]);
  // const [CreateAssetMutate] = useCreateAssetMutation()
  
  const onSubmit = async ({ name, slug, imageUrl, description }: FormData) => {
    try {
      const res = await createProjectAsset({
        variables: {
          input: {
            name, 
            slug,
            description,
            imageUrl,
            projectId: params.projectId!,
            properties: JSON.stringify({ fields }),
          }
        }
      })
      console.log(res)
      // const res = await CreateAssetMutate({
      //   variables: {
      //     input: {
      //       name,
      //     }
      //   }
      // })
      navigate(`/app/projects/${params.projectId}`)
    } catch (error) {
      toast.error("Could not create project");
    }
  };
  const onFileChange = async (e: any) => {
    const file = e.target.files[0]
    const imageBase64Data = await getBase64(file)
    const imageBase64 = imageBase64Data.split(',')[1]
    const res = await uploadImage({
      variables: {
        input: {
          imageBase64,
        }
      }
    })
    setValue('imageUrl', res.data?.uploadImage.url!)
  }
  const values = getValues()
  return (
    <AppLayout>
      <div className="mx-auto max-w-2xl mt-12">
        <div className="p-4 bg-base-300 rounded-md mb-12">
          <div className="font-bold p-2 pb-2">Create Asset</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full"
                  {...register('name', {
                    onChange: (e) => {
                      setValue('slug', slugify(e.target.value, { lower: true }))
                    },
                  })}
                />
              </div>
              <div className="form-control w-full mt-2">
                <label className="label">
                  <span className="label-text">Slug</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full"
                  {...register('slug')}
                />
              </div>
              <div className="form-control w-full mt-4">
                <label className="label">
                  <span className="label-text">Image</span>
                </label>
                <div className="flex items-center">
                  <div className="avatar">
                    <div className="w-24 rounded">
                      <img src={values.imageUrl} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <label className={`btn btn-primary ${uploading ? 'loading opacity-50': ''}`} htmlFor="image">
                      {!uploading && <UploadIcon className="w-5 h-5 mr-2" />}
                      Upload image
                    </label>
                    <input
                      className="hidden"
                      aria-describedby="user_avatar_help"
                      id="image"
                      type="file"
                      onChange={onFileChange}
                    />
                  </div>
                </div>
                <div className="form-control w-full mt-4">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered"
                    placeholder=""
                    {...register('description')}
                  ></textarea>
                </div>
                <div className="form-control w-full mt-4">
                  <label className="label">
                    <span className="label-text font-bold text-lg mb-2">Properties</span>
                  </label>
                  <PropertiesInput fields={fields} setFields={setFields} />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-4 w-full">
              Create
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};
