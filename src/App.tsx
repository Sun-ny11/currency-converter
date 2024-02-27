import { useSelector } from 'react-redux'
import './App.css'
import { Header } from './components/header/Header'
import { HomePage } from './components/homePage/HomePage'
import { AppRootStateType, useAppDispatch } from './redux/store'
import { comparisonTC } from './redux/convert-reducer'

function App() {

    const dispatch = useAppDispatch()
    const conversion = useSelector<AppRootStateType,number>(state=>state.convert.conversion_rate)

  return (
    <>
      <Header />
      <HomePage />

      <h1>Чтобы узнать курс выберите валюту</h1>
      <div>
        {/* <select>
          <option name={}>Российский рубль</option>
          <option>Белорусский рубль</option>
        </select>
        <select>
          <option>Доллар</option>
          <option>Евро</option>
        </select> */}
      </div>
      <h2>{conversion}</h2>
        <button onClick={()=>dispatch(comparisonTC("EUR","RUB"))}>Узнать курс</button>
    </>


  )
}

export default App
