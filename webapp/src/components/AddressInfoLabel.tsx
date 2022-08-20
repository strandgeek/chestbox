import React, { FC } from "react";
import { getIdenticonSrc } from "../utils/getIdenticonSrc";
import { getShortAddress } from "../utils/getShortAddress";

export interface AddressInfoLabelProps {
  address: string;
  short?: boolean
}

export const AddressInfoLabel: FC<AddressInfoLabelProps> = ({ address, short }) => {
  const addrLabel = short ? getShortAddress(address): address
  return (
    <div className="flex items-center">
      <div className="avatar">
        <div className="rounded-full w-4 h-4 mr-2">
          <img
            src={getIdenticonSrc(address)}
            width={24}
            height={24}
            alt={`Algorand Address`}
          />
        </div>
      </div>
      <div>{addrLabel}</div>
    </div>
  );
};
