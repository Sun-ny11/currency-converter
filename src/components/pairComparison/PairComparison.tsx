import { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { AppReducerStateType, setAmountCurrency, setBaseCurrency, setTargetCurrency } from "../../redux/request-reducer";
import { comparisonTC, supportedCurrencyTC } from "../../redux/response-reducer";
import s from "./PairComparison.module.css"
import { Input } from 'antd';
import countryData from "../../utils/countryData";
import { SelectAD } from "../select/SelectAD";
import { PairComparisonWrapper } from "./PairComparisonWrapper";


type PairComparisonProps = {
   currency: AppReducerStateType
}

export const PairComparison = ({ currency }: PairComparisonProps) => {

   const dispatch = useAppDispatch()
   const conversion = useAppSelector(state => state.response)


   useEffect(() => {
      dispatch(supportedCurrencyTC())
      dispatch(comparisonTC(currency.baseCurrency, currency.targetCurrency, currency.amountCurrency))
   }, [])


   const debounceTimeoutRef = useRef<number | null>(null);

   const amountHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const value = +e.currentTarget.value;
      dispatch(setAmountCurrency(value));

      if (debounceTimeoutRef.current) {
         clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
         dispatch(comparisonTC(currency.baseCurrency, currency.targetCurrency, value))
      }, 300);
   }

   const baseHandler = useCallback((value: string) => {
      dispatch(setBaseCurrency(value))
      dispatch(comparisonTC(value, currency.targetCurrency, currency.amountCurrency))
   }, [currency.targetCurrency, currency.amountCurrency])

   const targetHandler = useCallback((value: string) => {
      dispatch(setTargetCurrency(value))
      dispatch(comparisonTC(currency.baseCurrency, value, currency.amountCurrency))

   }, [currency.baseCurrency, currency.amountCurrency]);

   console.log("Pair");


   const symbol = countryData.find(el => el.abbreviation === currency.targetCurrency)

   const date = new Date(conversion.time_last_update_unix * 1000)
   const stringTime = new Intl.DateTimeFormat("ru", { hour12: false, hour: "numeric", minute: "numeric", second: "numeric" }).format(date)
   const stringDate = new Intl.DateTimeFormat("ru", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date)

   return (
      <PairComparisonWrapper>
         <h1>Чтобы узнать курс, выберите валюту</h1>
         <div className={s.card}>
            <div >
               <div>
                  <p>{"У меня есть"}</p>
                  <Input placeholder="Basic usage" value={currency.amountCurrency} type="number" onChange={amountHandler} />
                  <SelectAD currencyDefaultValue={currency.baseCurrency} selectHandler={baseHandler} />
                  <p>Я получу</p>
                  <SelectAD currencyDefaultValue={currency.targetCurrency} selectHandler={targetHandler} />
               </div>
               <div className={s.responseWindow}>
                  <p>{conversion.conversion_result} {symbol ? symbol?.symbol : currency.targetCurrency}</p>
               </div>
            </div>
         </div>
         <p>{`Данные от ${stringDate} ${stringTime}`}</p>
      </PairComparisonWrapper>
   );
};