import { ChangeEvent } from "react";
import { AppRootStateType, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { AppReducerStateType, setAmountCurrency, setBaseCurrency, setTargetCurrency } from "../../redux/app-reducer";
import { comparisonTC } from "../../redux/convert-reducer";

type PairComparisonProps = {
   currency: AppReducerStateType
}

export const PairComparison = ({ currency }: PairComparisonProps) => {

   const dispatch = useAppDispatch()
   const conversion = useSelector<AppRootStateType, number>(state => state.convert.conversion_result)


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

   return (
      <>
         <h1>Чтобы узнать курс выберите валюту</h1>
         <div>
            <input value={currency.amountCurrency} type="number" onChange={amountHandler} />

            <select value={currency.baseCurrency} onChange={baseHandler}>
               <option value={"USD"}>Доллар</option>
               <option value={"EUR"}>Евро</option>
            </select>

            <select value={currency.targetCurrency} onChange={targetHandler}>
               <option value={"RUB"}>Российский рубль</option>
               <option value={"BYN"}>Белорусский рубль</option>
            </select>

         </div>
         <h2>{conversion}</h2>
         <button onClick={onClickHandler}>Узнать курс</button>
      </>
   );
};