import { PlusCircleIcon, TrashIcon } from "@heroicons/react/outline";
import React, { FC } from "react";

export interface PropertyField {
  name: string;
  value: string;
  type: "number" | "text";
}

export interface PropertiesInputProps {
  fields: PropertyField[]
  setFields: React.Dispatch<React.SetStateAction<PropertyField[]>>
}

export const PropertiesInput: FC<PropertiesInputProps> = ({ fields, setFields }) => {
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
  const removeItem = (item: PropertyField) => {
    setFields([...fields.filter(i => i !== item)])
  }
  return (
    <div>
      {fields.map((field, idx) => (
        <div className="grid grid-cols-8 gap-4 mb-4" key={idx}>
          <div className="col-span-2">
            <label className="text-xs block mb-1">Type</label>
            <select
              className="select w-full"
              value={field.type}
              onChange={(e) => {
                fields[idx].type = e.target.value as 'number' | 'text'
                setFields([...fields])
              }}
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="text-xs block mb-1">Name</label>
            <input
              className="input w-full"
              placeholder=""
              value={field.name}
              onChange={(e) => {
                fields[idx].name = e.target.value
                setFields([...fields])
              }}
            />
          </div>
          <div className="col-span-3">
            <label className="text-xs block mb-1">Value</label>
            <input
              className="input w-full"
              placeholder=""
              value={field.value}
              onChange={(e) => {
                fields[idx].value = e.target.value
                setFields([...fields])
              }}
            />
          </div>
          <button type="button" onClick={() => removeItem(field)}>
            <TrashIcon className="h-6 w-6 text-red-500 mt-6" />
          </button>
        </div>
      ))}
      <div>
        <button type="button" className="btn btn-link btn-primary" onClick={() => addItem()}>
          <PlusCircleIcon className="w-4 h-4 mr-2" />
          Add Property
        </button>
      </div>
    </div>
  );
};
