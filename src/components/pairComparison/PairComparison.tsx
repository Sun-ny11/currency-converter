import { ChangeEvent, useEffect, useRef } from "react";
import { AppRootStateType, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { AppReducerStateType, setAmountCurrency, setBaseCurrency, setTargetCurrency } from "../../redux/app-reducer";
import { comparisonTC, convertStateReducerType, supportedCurrencyTC } from "../../redux/convert-reducer";
import s from "./PairComparison.module.css"
import { RequestType } from "../../redux/error-reducer";
import { Layout, Menu, theme } from 'antd';
import { Card } from "../card/Card";

const { Header, Content, Footer } = Layout;

type PairComparisonProps = {
   currency: AppReducerStateType
}

export const PairComparison = ({ currency }: PairComparisonProps) => {

   const dispatch = useAppDispatch()
   const conversion = useSelector<AppRootStateType, convertStateReducerType>(state => state.convert)
   const status = useSelector<AppRootStateType, RequestType>(state => state.error.status)

   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();

   useEffect(() => {
      console.log("EFF");

      dispatch(supportedCurrencyTC())
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
   };
   const baseHandler = (value: string) => {
      dispatch(setBaseCurrency(value))
      dispatch(comparisonTC(value, currency.targetCurrency, currency.amountCurrency))
   };
   const targetHandler = (value: string) => {
      dispatch(setTargetCurrency(value))
   };
   const reverseHandler = (e: ChangeEvent<HTMLInputElement>) => {
      // dispatch(setSecondCurrency(+e.currentTarget.value))
      //пока что не реализован 
   };


   return (
      <>
         <Layout style={{ height: "100vh" }}>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
               <div className="demo-logo" />
               <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['2']}
                  style={{ flex: 1, minWidth: 0 }}
               />
            </Header>
            <Content style={{ padding: '0 48px', }}>
               <div
                  style={{
                     background: colorBgContainer,
                     minHeight: 280,
                     padding: 24,
                     borderRadius: borderRadiusLG,
                     display: "flex",
                     alignItems: "center",
                     flexDirection: "column",
                     justifyContent: "center",
                     height: "100%"
                  }}
               >
                  <h1>Чтобы узнать курс, выберите валюту</h1>
                  <div className={s.card}>
                     <div > {/*style={{ display: "flex", flexDirection: isToggleCards ? 'row-reverse' : 'row' }} */}
                        <Card title={"У меня есть"}
                           currencyDefaultValue={currency.baseCurrency}
                           selectHandler={baseHandler}
                           onChange={amountHandler}
                           inputValue={currency.amountCurrency}
                        />

                        <Card title={"Я получу"}
                           currencyDefaultValue={currency.targetCurrency}
                           selectHandler={targetHandler}
                           onChange={reverseHandler}
                           inputValue={conversion.conversion_result}
                        />
                     </div>
                  </div>
               </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
               Sun_ny11 ©{new Date().getFullYear()} Created with love
            </Footer>
         </Layout>
      </>
   );
};