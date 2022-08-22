/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { AuthButton } from "../components/AuthButton";
import GitHubButton from "react-github-btn";

export const HomePage = () => {
  return (
    <div className="relative overflow-hidden">
      <main>
        <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden h-screen bg-cover" style={{ backgroundImage: `url(/home-bg.jpg)`}}>
        <div className=" pt-6">
          <nav
            className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
            aria-label="Global"
          >
            <div className="flex items-center flex-1">
              <div className="flex items-center justify-between w-full md:w-auto p-4 md:px-0">
                <a href="#">
                  <span className="sr-only">ChestBox</span>
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="/chestbox-logo.png"
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-6">
              <a
                className="btn btn-sm rounded-md normal-case"
                href="https://www.npmjs.com/package/@strandgeek/chestbox-sdk"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/npm-logo.svg" className="h-4 w-4 mr-2" />
                NodeJS SDK v0.0.3
              </a>
              <div className="hidden space-x-8 md:flex md:ml-10 mt-2 mr-8">
                <GitHubButton
                  href="https://github.com/strandgeek/chestbox"
                  data-size="large"
                  aria-label="Star strandgeek/chestbox on GitHub"
                >
                  Star
                </GitHubButton>
              </div>
              <AuthButton />
            </div>
          </nav>
        </div>
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                <div className="lg:py-24">
                  <a
                    href="https://gitcoin.co/hackathon/greenhouse/projects/16368/chestbox"
                    target="_blank"
                    className="inline-flex items-center text-white bg-gray-900 rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                    rel="noreferrer"
                  >
                    <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-primary rounded-full">
                      BETA
                    </span>
                    <span className="ml-4 text-sm">
                      This project was created for Algorand Hackathon
                    </span>
                    <ChevronRightIcon
                      className="ml-2 w-5 h-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </a>
                  <h1 className="mt-4 text-3xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                    <span className="block text-4xl">A better way to</span>
                    <span className="block text-4xl">
                      manage Web3 Game Assets
                    </span>
                    <span className="block text-4xl">
                      on Algorand Blockchain
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Create, manage and mint Game Assets on Algorand Blockchain
                    and integrate with your game easily using our SDKs
                  </p>
                  <div className="mt-8">
                    <AuthButton />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="">
                  <div className="mockup-window border border-base-content bg-base-300 mt-12">
                    <div className="flex justify-center bg-base-200">
                      <img src="/app-screenshot.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
