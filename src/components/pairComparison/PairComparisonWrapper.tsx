import { Layout, Menu, theme } from 'antd';
import s from "./PairComparison.module.css"


type WrapperProps = {
   children: React.ReactNode;
}

export const PairComparisonWrapper = ({ children }: WrapperProps) => {
   const { Header, Content, Footer } = Layout;

   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();

   return (
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
            <div className={s.contentWrap}
               style={{
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
               }}
            >
               {children}
            </div>
         </Content>
         <Footer style={{ textAlign: 'center' }}>
            Sun_ny11 ©{new Date().getFullYear()} Created with love
         </Footer>
      </Layout>
   );
};