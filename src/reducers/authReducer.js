export default function(state = { name: "hello" }, action) {
  switch (action.type) {
    case "FETCH_WEATHER":
      return { ...state };

    default:
      return state;
  }
}
