export const actionCreator = (type) => (payload) => ({
  type,
  payload,
});

export function createStore(reducer, middlewares = []) {
  let state;
  const handlers = [];

  function dispatch(action) {
    state = reducer(state, action);
    handlers.forEach((handler) => handler());
  }

  function getState() {
    return state;
  }

  function subscribe(handler) {
    handlers.push(handler);
  }

  const store = {
    getState,
    subscribe,
    dispatch,
  };
  middlewares = Array.from(middlewares).reverse();
  // Array.from을 이용해서 원본이 훼손되는 것을 방지

  let lastDispatch = dispatch;

  middlewares.forEach((middleware) => {
    lastDispatch = middleware(store)(lastDispatch);
  });

  store.dispatch = lastDispatch;
  // Monkey patching

  return store;
}
