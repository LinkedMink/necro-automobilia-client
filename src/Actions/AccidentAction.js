export const SAVE_LOCATION_QUERY = "SAVE_LOCATION_QUERY";
export const SAVE_TEST_QUERY = "SAVE_TEST_QUERY";

export function saveLocationAccidents(data, params) {
  return {
    type: SAVE_LOCATION_QUERY,
    payload: {
      locationResult: data,
      locationParams: params,
    },
  };
}

export function saveTestAccidents(data, params) {
  return {
    type: SAVE_TEST_QUERY,
    payload: {
      testResult: data,
      testParams: params,
    },
  };
}
