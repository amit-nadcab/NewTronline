import { SET_ADDRESS, TOTAL_BALANCE } from "./constant";

const saveaddress = (data) => {
  return {
    type: SET_ADDRESS,
    data: data,
  };
};

const savebalance = (data) => {
  return {
    type: TOTAL_BALANCE,
    data: data,
  };
};

export { savebalance, saveaddress };
