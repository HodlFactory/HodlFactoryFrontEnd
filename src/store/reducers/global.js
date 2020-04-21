import { SET_DRIZZLE_INIT } from "../actions/global";

export default function (
  state = {
    drizzleInit: null,
  },
  action
) {
  switch (action.type) {
    case SET_DRIZZLE_INIT: {
      const { init } = action.payload;
      return {
        ...state,
        drizzleInit: init,
      };
    }
    default: {
      return state;
    }
  }
}
