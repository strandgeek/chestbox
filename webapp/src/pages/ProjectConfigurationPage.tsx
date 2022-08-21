import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useProjectConfigQuery } from "../generated/graphql";
import { AppLayout } from "../layouts/AppLayout";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 as dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export interface ProjectConfigurationPageProps {}

export const ProjectConfigurationPage: FC<ProjectConfigurationPageProps> = (
  props
) => {
  const params = useParams();
  const { data } = useProjectConfigQuery({
    variables: {
      id: params.projectId!,
    },
  });
  const project = data?.project || ({} as any);
  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl mt-24">
        <h3 className="text-3xl mb-8 mx-2">{project.name}</h3>
        <div className="card bg-base-300">
          <div className="card-body">
            <div className="card-title">API Integration</div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">API Token</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={project.apiToken}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">SDKs</span>
              </label>
              <div className="bg-base-200">
                <div className="tabs">
                  <a className="tab tab-lifted tab-active">
                    <img src="/sdks/nodejs.svg" className="h-4 w-4 mr-2" />
                    NodeJS
                  </a>
                  <span className="tooltip" data-tip="Coming Soon">
                    <a className="tab tab-lifted cursor-not-allowed">
                      <img src="/sdks/go.svg" className="h-6 mr-1" />
                      Go
                    </a>
                  </span>
                  <div className="tooltip" data-tip="Coming Soon">
                    <a className="tab tab-lifted cursor-not-allowed">
                      <img src="/sdks/cpp.svg" className="h-4 mr-2" />
                      C++
                    </a>
                  </div>
                  <div className="tooltip" data-tip="Coming Soon">
                    <a className="tab tab-lifted cursor-not-allowed">
                      <img src="/sdks/java.png" className="h-4 mr-2 bg-white" />
                      Java
                    </a>
                  </div>
                </div>
                <div className="p-8">
                  <SyntaxHighlighter language="typescript" style={dark} customStyle={{ background: '#15191F', padding: '24px', fontSize: '14px'}}>
                    {[
                      `import ChestBoxSDK from '@strandgeek/chestbox-sdk';`,
                      ``,
                      `const chestbox = new ChestBoxSDK({ apiToken: 'YOUR_API_TOKEN' })`,
                      ``,
                      ``,
                      `chestbox.mintAsset({`,
                      `  slug: "basic-sword",`,
                      `  to: "DNKRBWSS3GF57WGRR7OMG6DUS2EHPMYLJ364LOCJG6C5FBZKX4DMKVKS3Y"`,
                      `})`,
                      `.then((data) => console.log(data))`,
                      `.catch((err) => console.log(err))`,
                    ].join('\n')}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
