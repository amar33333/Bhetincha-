const INITIAL_STATE = {
  // test
  isPinging: false,
  kxa: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "PING__ADMIN":
      return { ...state, isPinging: true };

    case "PONG__ADMIN":
      return { ...state, isPinging: false };

    case "PING2__ADMIN":
      return { ...state, kxa: true };

    case "PONG2__ADMIN":
      return { ...state, kxa: false };
    default:
      return state;
  }
}
