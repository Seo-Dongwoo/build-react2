export const logger = (store) => (next) => (action) => {
  // 현재 상태를 가져오는 것
  const currentState = store.getState();

  console.groupCollapsed("action logger => ", action.type);
  console.log("current state", currentState);
  console.log("action payload", action.payload);
  console.groupEnd();

  next(action);
};
// 현재 어떤 action이 dispatch가 됐다는 건 그 action의 결과로 reducer가 돌아서
// 새로운 데이터 상태가 만들어지는 것.
