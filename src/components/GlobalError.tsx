import { useEffect } from "react"
import { useAppSelector } from "../redux/store"
import { ToastContainer, toast } from "react-toastify"

export const GlobalError = () => {

   const error = useAppSelector(state => state.response.error)

   const errorMessage = error

   useEffect(() => {
      if (errorMessage) {
         toast.error(errorMessage)
      }
   }, [errorMessage])

   return <ToastContainer position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
   />
}