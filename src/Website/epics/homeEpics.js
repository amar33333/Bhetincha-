export const pingEpic = (action$, { getState }) =>
  action$
    .ofType("PING")
    .delay(1000)
    .do(() => {
      console.log(getState().auth.cookies.user_data);
    })
    .mapTo({ type: "PONG" });
