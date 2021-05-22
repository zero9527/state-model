import { createModel } from '../index';

export const useTestModel = createModel(function ({ onChange }) {
  const state = {
    count: 0,
  };

  function setCount (newCount: number) {
    onChange({ key: 'count', value: newCount });
  }

  return {
    state,
    setCount,
  }
});

const testModel = useTestModel();
testModel.state.count;
testModel.setCount(2);
