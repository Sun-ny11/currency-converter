import { useSelector } from 'react-redux'
import './App.css'
import { PairComparison } from "./components/pairComparison/PairComparison"
import { AppRootStateType } from './redux/store'
import { AppReducerStateType } from './redux/app-reducer'

function App() {

  const currency = useSelector<AppRootStateType, AppReducerStateType>(state => state.app)

  return (
    <>
      <PairComparison currency={currency} />
    </>
  )
}

export default App
