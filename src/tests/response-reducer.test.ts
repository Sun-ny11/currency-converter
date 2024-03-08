import { convertStateReducerType, responseReducer, comparisonAC, supportedCurrencyAC, setSecondCurrency } from "../redux/response-reducer"
import { beforeEach, expect, test } from 'vitest'



let initialState: convertStateReducerType;

beforeEach(() => {
   initialState = {
      result: "",
      documentation: "",
      terms_of_use: "",
      time_last_update_unix: 0,
      time_last_update_utc: "",
      time_next_update_unix: 0,
      time_next_update_utc: "",
      base_code: "",
      target_code: "",
      conversion_rate: 0,
      conversion_result: 0,
      supported_codes: [["", ""]],
   };
});

test("should handle COMPARISON action", () => {
   const resPair = {
      result: "result",
      documentation: "documentation",
      terms_of_use: "terms_of_use",
      time_last_update_unix: 1234567890,
      time_last_update_utc: "time_last_update_utc",
      time_next_update_unix: 9876543210,
      time_next_update_utc: "time_next_update_utc",
      base_code: "base_code",
      target_code: "target_code",
      conversion_rate: 1.2345,
      conversion_result: 6.789,
   };

   const action = comparisonAC(resPair);
   const newState = responseReducer(initialState, action);

   expect(newState).toEqual({
      result: "result",
      documentation: "documentation",
      terms_of_use: "terms_of_use",
      time_last_update_unix: 1234567890,
      time_last_update_utc: "time_last_update_utc",
      time_next_update_unix: 9876543210,
      time_next_update_utc: "time_next_update_utc",
      base_code: "base_code",
      target_code: "target_code",
      conversion_rate: 1.2345,
      conversion_result: 6.789,
      supported_codes: [["", ""]],
   });
});

test("should handle SUPPORTED-CURRENCY action", () => {
   const supCode = [["code1", "name1"], ["code2", "name2"]];

   const action = supportedCurrencyAC(supCode);
   const newState = responseReducer(initialState, action);

   expect(newState).toEqual({
      result: "",
      documentation: "",
      terms_of_use: "",
      time_last_update_unix: 0,
      time_last_update_utc: "",
      time_next_update_unix: 0,
      time_next_update_utc: "",
      base_code: "",
      target_code: "",
      conversion_rate: 0,
      conversion_result: 0,
      supported_codes: [["code1", "name1"], ["code2", "name2"]],
   });
});

test("should handle SET-SECOND-CURRENCY action", () => {
   const second = 123.456;

   const action = setSecondCurrency(second);
   const newState = responseReducer(initialState, action);

   expect(newState).toEqual({
      result: "",
      documentation: "",
      terms_of_use: "",
      time_last_update_unix: 0,
      time_last_update_utc: "",
      time_next_update_unix: 0,
      time_next_update_utc: "",
      base_code: "",
      target_code: "",
      conversion_rate: 0,
      conversion_result: 123.456,
      supported_codes: [["", ""]],
   });
});

test("should return initial state when unknown action type is provided", () => {
   const action = { type: "UNKNOWN_ACTION" } as any;//Ругается на типы.
   const newState = responseReducer(initialState, action); 

   expect(newState).toEqual(initialState);
});
