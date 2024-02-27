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
}

const instance = axios.create({
   baseURL: "https://v6.exchangerate-api.com/v6/4f7094e78af7307410437337/",

})

export const convertAPI = {
   comparisonPair(main: string, withIt: string) {
      return instance.get<comparisonPare>(`pair/${main}/${withIt}`)
   }
}