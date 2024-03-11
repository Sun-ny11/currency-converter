import { Select } from 'antd';
import { useAppSelector } from '../../redux/store';
import { memo } from 'react';

type SelectADProps = {
   currencyDefaultValue: string
   selectHandler: (value: string) => void
}

export const SelectAD = memo(({ currencyDefaultValue, selectHandler }: SelectADProps) => {

   const conversion = useAppSelector(state => state.response)

   return (
      <Select
         placeholder="Search to Select"
         showSearch
         defaultValue={currencyDefaultValue}
         style={{ width: "100%" }}
         onChange={selectHandler}
         optionFilterProp="children"
         filterOption={(input, option) => (option?.label ?? '').includes(input)}
         filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
         options={conversion.supported_codes.map(el => ({ label: el[1], value: el[0], }))}
      />
   );
});