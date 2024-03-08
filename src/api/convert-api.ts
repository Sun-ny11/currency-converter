import axios from "axios"

export type comparisonPare = {
   result: string;
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

const instance = axios.create({
   baseURL: "https://v6.exchangerate-api.com/v6/86955b467278f640fd22c3eb/",
})

export const convertAPI = {
   comparisonPair(base: string, target: string, amount: number) {
      return instance.get<comparisonPare>(`pair/${base}/${target}/${amount}`)
   },
   fetchSupportedCodes() {
      return instance.get<SupportedCodesResponse>("codes")
   }
}