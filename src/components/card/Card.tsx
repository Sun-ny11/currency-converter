import { ChangeEvent } from "react";
import { SelectAD } from "../select/SelectAD";
import { Input } from 'antd';
type CardProps = {
   title: string
   currencyDefaultValue: string
   selectHandler: (value: string) => void
   onChange: (e: ChangeEvent<HTMLInputElement>) => void
   inputValue: number
}
export const Card = ({ title, currencyDefaultValue, selectHandler, onChange, inputValue }: CardProps) => {
   return (
      <div>
         <p>{title}</p>
         <SelectAD currencyDefaultValue={currencyDefaultValue} selectHandler={selectHandler} />
         <Input placeholder="Basic usage" value={inputValue} type="number" onChange={onChange} />
      </div>
   );
};