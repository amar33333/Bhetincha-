const pingEpic2 = action$ =>
  action$
    .ofType("PING__ADMIN")
    .delay(1000)
    .mapTo({ type: "PONG__ADMIN" });

const pingEpic3 = action$ =>
  action$
    .ofType("PING2__ADMIN")
    .delay(1000)
    .mapTo({ type: "PONG2__ADMIN" });

export default [pingEpic2, pingEpic3];
