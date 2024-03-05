import { Select } from 'antd';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../redux/store';
import { convertStateReducerType } from '../../redux/convert-reducer';
import { AppReducerStateType } from '../../redux/app-reducer';

type SelectADProps = {
   currency: AppReducerStateType
   baseHandler: (value: string) => void

}
export const SelectAD = ({ currency, baseHandler }: SelectADProps) => {

   const conversion = useSelector<AppRootStateType, convertStateReducerType>(state => state.convert)

   return (
      <Select
         placeholder="Search to Select"
         showSearch
         defaultValue={currency.baseCurrency}
         style={{ width: "100%" }}
         onChange={baseHandler}
         optionFilterProp="children"
         filterOption={(input, option) => (option?.label ?? '').includes(input)}
         filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
         options={conversion.supported_codes.map(el => ({ label: el[1], value: el[0], }))}
      />
   );
};