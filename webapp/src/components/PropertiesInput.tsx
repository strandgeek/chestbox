import { PlusCircleIcon, TrashIcon } from "@heroicons/react/outline";
import React, { FC, useState } from "react";

export interface PropertiesInputProps {}

interface Field {
  name: string;
  value: string;
  type: "number" | "text";
}

export const PropertiesInput: FC<PropertiesInputProps> = (props) => {
  const [fields, setFields] = useState<Field[]>([]);
  const addItem = () => {
    setFields((fields) => [
      ...fields,
      {
        name: "",
        value: "",
        type: "text",
      },
    ]);
  };
  return (
    <div>
      {fields.map((field) => (
        <div className="grid grid-cols-8 gap-4 mb-4">
          <div className="col-span-2">
            <label className="text-xs block mb-1">Type</label>
            <select className="select w-full">
              <option>Text</option>
              <option>Number</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="text-xs block mb-1">Name</label>
            <input className="input w-full" placeholder="" />
          </div>
          <div className="col-span-3">
            <label className="text-xs block mb-1">Value</label>
            <input className="input w-full" placeholder="" />
          </div>
          <button>
            <TrashIcon className="h-6 w-6 text-red-500 mt-6" />
          </button>
        </div>
      ))}
      <div>
        <button className="btn btn-link btn-primary" onClick={() => addItem()}>
          <PlusCircleIcon className="w-4 h-4 mr-2" />
          Add Property
        </button>
      </div>
    </div>
  );
};
