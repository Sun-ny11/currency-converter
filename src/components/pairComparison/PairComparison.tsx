import { ChangeEvent, useEffect } from "react";
import { AppRootStateType, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { AppReducerStateType, setAmountCurrency, setBaseCurrency, setTargetCurrency } from "../../redux/app-reducer";
import { comparisonTC, convertStateReducerType, supportedCurrencyTC } from "../../redux/convert-reducer";
import s from "./PairComparison.module.css"
import { Select } from 'antd';


type PairComparisonProps = {
   currency: AppReducerStateType
}

export const PairComparison = ({ currency }: PairComparisonProps) => {

   const dispatch = useAppDispatch()
   const conversion = useSelector<AppRootStateType, convertStateReducerType>(state => state.convert)


   useEffect(() => {
      dispatch(supportedCurrencyTC())
   }, [])

   const baseHandler = (e: ChangeEvent<HTMLSelectElement>) => {
      dispatch(setBaseCurrency(e.currentTarget.value))
   }
   const targetHandler = (e: ChangeEvent<HTMLSelectElement>) => {
      dispatch(setTargetCurrency(e.currentTarget.value))
   }
   const amountHandler = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setAmountCurrency(+e.currentTarget.value))
   }

   const onClickHandler = () => {
      dispatch(comparisonTC(currency.baseCurrency, currency.targetCurrency, currency.amountCurrency))
   }
   const handleChange = (value: string) => {
      dispatch(setBaseCurrency(value))
   };


   return (
      <div className={s.main}>
         <h1>Чтобы узнать курс выберите валюту</h1>
         <div className={s.card}>

            <div>
               <select value={currency.baseCurrency} onChange={baseHandler}>
                  {conversion.supported_codes.map(el => <option value={el[0]}>{el[1]}</option>)}
               </select>
               <div>
                  <input value={currency.amountCurrency} type="number" onChange={amountHandler} />
               </div>
            </div>
            <button onClick={onClickHandler}>Узнать курс</button>
            <div>
               <select value={currency.targetCurrency} onChange={targetHandler}>
                  {conversion.supported_codes.map(el => <option value={el[0]}>{el[1]}</option>)}
               </select>
               <h2>{conversion.conversion_result}</h2>
            </div>

         </div>
         <Select
            defaultValue={currency.baseCurrency}
            style={{ width: 200 }}
            onChange={handleChange}
            options={conversion.supported_codes.map(el => ({ label: el[1], value: el[0], }))}
         />

      </div>
   );
};