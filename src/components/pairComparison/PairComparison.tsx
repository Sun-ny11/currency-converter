import { ChangeEvent, useEffect, useRef } from "react";
import { AppRootStateType, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { AppReducerStateType, setAmountCurrency, setBaseCurrency, setTargetCurrency } from "../../redux/app-reducer";
import { comparisonTC, convertStateReducerType, setSecondCurrency, supportedCurrencyTC } from "../../redux/convert-reducer";
import s from "./PairComparison.module.css"
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { RequestType } from "../../redux/error-reducer";
import { SelectAD } from "../select/SelectAD";
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer } = Layout;

type PairComparisonProps = {
   currency: AppReducerStateType
}

export const PairComparison = ({ currency }: PairComparisonProps) => {

   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();


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
      dispatch(comparisonTC(value, currency.targetCurrency, currency.amountCurrency))
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
         <>
            <Layout style={{ height:"100vh" }}>
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
                        height:"100%"
                     }}
                  >
                     <h1>Чтобы узнать курс, выберите валюту</h1>
                     <div className={s.card}>

                        <div className={s.iHave}>
                           <p>У меня есть</p>
                           <SelectAD currency={currency} baseHandler={baseHandler} />
                           <Input placeholder="Basic usage" value={currency.amountCurrency} type="number" onChange={amountHandler} />
                        </div>

                        <Button type="default" icon={<SearchOutlined />} onClick={onClickHandler}>Узнать</Button>

                        <div className={s.iWillGive}>
                           <p>Я получу</p>
                           <SelectAD currency={currency} baseHandler={targetHandler} />
                           <Input placeholder="Basic usage" value={conversion.conversion_result} type="number" onChange={reverseHandler} />
                        </div>
                     </div>
                  </div>
               </Content>
               <Footer style={{ textAlign: 'center' }}>
                  Ant Design ©{new Date().getFullYear()} Created by Sun_ny11
               </Footer>
            </Layout>
         </>

      </div>
   );
};