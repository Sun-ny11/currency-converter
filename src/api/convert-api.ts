import axios from "axios"
import { RequestType } from "../redux/error-reducer";

export type comparisonPare = {
   result: RequestType;
   documentation: string;
   terms_of_use: string;
   time_last_update_unix: number;
   time_last_update_utc: string;
   time_next_update_unix: number;
   time_next_update_utc: string;
   base_code: string;
   target_code: string;
   conversion_rate: number;
   conversion_result: number
}

export type Currency = Array<string>
type SupportedCodesResponse = {
   result: string
   documentation: string
   terms_of_use: string
   supported_codes: Currency[]
};

// type ErrorType = {
//    result: string;
//    documentation: string;
//    "terms-of-use": string;
//    "error-type": string;
// };

const instance = axios.create({
   baseURL: "https://v6.exchangerate-api.com/v6/4f7094e78af7307410437337/",
})

export const convertAPI = {
   comparisonPair(base: string, target: string, amount: number) {
      return instance.get<comparisonPare>(`pair/${base}/${target}/${amount}`)
   },
   fetchSupportedCodes() {
      return instance.get<SupportedCodesResponse>("codes")
   }
}