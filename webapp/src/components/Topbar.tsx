import { FC } from "react";
import { MyAccountInfo } from "react-web3-daisyui/dist/eth";
import { useWeb3 } from "../hooks/useWeb3";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { ConnectWalletButton } from "./ConnectWalletButton";

export interface TopbarProps {}

interface NavigationLink {
  name: string;
  href: string;
  current: boolean;
}

export const Topbar: FC<TopbarProps> = (props) => {
  const { accountAddress, loading } = useWeb3();
  const links: NavigationLink[] = [
    { name: "Dashboard", href: "#", current: true },
    { name: "Team", href: "#", current: false },
    { name: "Projects", href: "#", current: false },
    { name: "Calendar", href: "#", current: false },
  ];
  const renderUserInfo = () => {
    if (loading) {
      return null;
    }
    if (accountAddress) {
      return (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost normal-case">
            <MyAccountInfo />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
          </ul>
        </div>
      );
    }
    return (
      <ConnectWalletButton />
    );
  };
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="navbar bg-base-100 border-b border-base-300 py-4">
            <div className="navbar-start">
              <div className="flex-none">
                <Disclosure.Button className="btn btn-square btn-ghost sm:hidden">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
              </div>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal p-0">
                {links.map((link) => (
                  <li className="mr-2 last:mr-0">
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="navbar-end">
              <div className="flex-none">{renderUserInfo()}</div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-base-200">
              {links.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-primary text-primary-content"
                      : "text-base hover:bg-primary hover:bg-opacity-80 hover:text-primary-content",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
