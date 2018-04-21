export const pingEpic = action$ =>
  action$
    .ofType("TRUEEEEE")
    .delay(1000)
    .mapTo({ type: "PONG" });
