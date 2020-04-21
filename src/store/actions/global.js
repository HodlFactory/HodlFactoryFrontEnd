export const SET_DRIZZLE_INIT = "SET_DRIZZLE_INIT";

export const updateDrizzleInit = (init) => {
  return {
    type: SET_DRIZZLE_INIT,
    payload: { init },
  };
};
