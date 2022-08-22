import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useProjectConfigQuery } from "../generated/graphql";
import { AppLayout } from "../layouts/AppLayout";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 as dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export interface ProjectConfigurationPageProps {}

const NODE_USAGE_STEP_1 = `
npm i @strandgeek/chestbox-sdk
`

const NODE_USAGE_STEP_2 = `
const chestbox = new ChestBoxSDK({
  algodClient: '<YOUR_ALGO_CLIENT>',
  apiToken: '<YOUR_CHESTBOX_PROJECT_TOKEN>',
  minterAccount: algosdk.mnemonicToSecretKey('<MINTER_MNEMONIC>')
})
`
const NODE_USAGE_STEP_3 = `
const { assetID } = await chestbox.claimAsset({
  slug: 'super-sword',
  to: <PLAYER_WALLET_ADDRESS>,
})
`
const NODE_USAGE_STEP_4 = `
const result = await chestbox.completeClaimAsset({
  assetID,
})
`

const CodeHighlighter: FC<{ children: string, language?: string }> = ({ children, language = 'typescript' }) => (
  <SyntaxHighlighter language={language} style={dark} customStyle={{ background: '#15191F', padding: '24px', fontSize: '14px'}}>
    {children}
  </SyntaxHighlighter>
)


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
                  <div>                    
                    <h2 className="text-xl mb-2">
                      Install SDK
                    </h2>
                    <CodeHighlighter language="bash">
                      {NODE_USAGE_STEP_1.trim()}
                    </CodeHighlighter>
                  </div>
                  <div className="mt-8">                    
                    <h2 className="text-xl mb-2">
                      Usage
                    </h2>
                    <CodeHighlighter>
                      {NODE_USAGE_STEP_2.trim()}
                    </CodeHighlighter>
                  </div>
                  <div className="mt-8">                    
                    <h2 className="text-xl mb-2">
                      Claim an Asset to a Player
                    </h2>
                    <p className="my-4">
                      When you want to give an asset to the player in the game, you call this command
                    </p>
                    <CodeHighlighter>
                      {NODE_USAGE_STEP_3.trim()}
                    </CodeHighlighter>
                  </div>
                  <div className="mt-8">                    
                    <h2 className="text-xl mb-2">
                    Complete Claim
                    </h2>
                    <p className="my-4">
                      After the player opt-in step, you can complete the claim (transfer the token from minter to player wallet)
                    </p>
                    <CodeHighlighter>
                      {NODE_USAGE_STEP_4.trim()}
                    </CodeHighlighter>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
