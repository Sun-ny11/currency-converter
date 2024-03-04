import { ChangeEvent, useEffect, useRef } from "react";
import { AppRootStateType, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { AppReducerStateType, setAmountCurrency, setBaseCurrency, setTargetCurrency } from "../../redux/app-reducer";
import { comparisonTC, convertStateReducerType, setSecondCurrency, supportedCurrencyTC } from "../../redux/convert-reducer";
import s from "./PairComparison.module.css"
import { Button, Input, Select, Spin } from 'antd';
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import { RequestType } from "../../redux/error-reducer";


type PairComparisonProps = {
   currency: AppReducerStateType
}

export const PairComparison = ({ currency }: PairComparisonProps) => {

   const dispatch = useAppDispatch()
   const conversion = useSelector<AppRootStateType, convertStateReducerType>(state => state.convert)
   const status = useSelector<AppRootStateType, RequestType>(state => state.error.status)

   useEffect(() => {
      dispatch(supportedCurrencyTC())
   }, [])

   const debounceTimeoutRef = useRef<number | null>(null);

   const amountHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const value = +e.currentTarget.value;
      dispatch(setAmountCurrency(value));

      // Очищаем предыдущий таймаут, если он есть
      if (debounceTimeoutRef.current) {
         clearTimeout(debounceTimeoutRef.current);
      }

      // Устанавливаем новый таймаут для задержки
      debounceTimeoutRef.current = setTimeout(() => {
         dispatch(comparisonTC(currency.baseCurrency, currency.targetCurrency, value))
      }, 300);
   };


   const onClickHandler = () => {
      dispatch(comparisonTC(currency.baseCurrency, currency.targetCurrency, currency.amountCurrency))
   }
   const baseHandler = (value: string) => {

      dispatch(setBaseCurrency(value))
   };
   const targetHandler = (value: string) => {
      dispatch(setTargetCurrency(value))
   };
   const reverseHandler = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setSecondCurrency(+e.currentTarget.value))
      //пока что не реализован 
   };


   return (
      <div className={s.main}>
         <h1>Чтобы узнать курс выберите валюту</h1>
         <div className={s.card}>

            <div className={s.iHave}>
               <p>У меня есть</p>
               <Select
                  defaultValue={currency.baseCurrency}
                  style={{ width: 200 }}
                  onChange={baseHandler}
                  options={conversion.supported_codes.map(el => ({ label: el[1], value: el[0], }))}
               />
               <Input placeholder="Basic usage" value={currency.amountCurrency} type="number" onChange={amountHandler} />
               {/* <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> */}
            </div>

            <Button type="default" icon={<SearchOutlined />} onClick={onClickHandler}>Узнать</Button>

            <div className={s.iWillGive}>
               <p>Я получу</p>
               <Select
                  defaultValue={currency.targetCurrency}
                  style={{ width: 200 }}
                  onChange={targetHandler}
                  options={conversion.supported_codes.map(el => ({ label: el[1], value: el[0], }))}
               />
               <Input placeholder="Basic usage" value={conversion.conversion_result} type="number" onChange={reverseHandler} />
            </div>
         </div>
      </div>
   );
};