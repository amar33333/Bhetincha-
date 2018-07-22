const epics = [];

epics.push(action$ =>
  action$.ofType("TEST_TEST_TEST").mapTo({ type: "TEST_2_TEST_2" })
);

export default epics;
