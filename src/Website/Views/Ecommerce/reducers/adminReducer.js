import {
  FETCH_CATEGORIES_FULFILLED,
  FETCH_CATEGORIES_PENDING,
  FETCH_CATEGORIES_REJECTED
} from "../actions/types";

const INITIAL_STATE = {
  categories: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_FULFILLED:
      return {
        ...state,
        categories: {
          name: "root",
          toggled: true,
          children: [
            {
              name: "parent",
              children: [{ name: "child1" }, { name: "child2" }]
            },
            {
              name: "loading parent",
              loading: true,
              children: []
            },
            {
              name: "parent",
              children: [
                {
                  name: "nested parent",
                  children: [
                    { name: "nested child 1" },
                    { name: "nested child 2" }
                  ]
                }
              ]
            }
          ]
        }
      };

    default:
      return state;
  }
}
