export const pingEpic2 = action$ =>
  action$
    .ofType("PING__ADMIN")
    .debounceTime(500)
    .delay(1000)
    .mapTo({ type: "PONG__ADMIN" });

export const pingEpic3 = (action$, { getState }) =>
  action$
    .ofType("PING2__ADMIN")
    .do(() => {
      console.log(getState().AdminContainer);
    })
    .delay(1000)

    .mapTo({ type: "PONG2__ADMIN" });
