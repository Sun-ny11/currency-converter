import { useSelector } from 'react-redux'
import './App.css'
import { PairComparison } from "./components/pairComparison/PairComparison"
import { AppRootStateType } from './redux/store'
import { AppReducerStateType } from './redux/request-reducer'
import { GlobalError } from './components/GlobalError'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  console.log("APP");

  const currency = useSelector<AppRootStateType, AppReducerStateType>(state => state.request)
  return (
    <>
      <PairComparison currency={currency} />
      <GlobalError />
    </>
  )
}

export default App
