const zrModel = require("../dist/zr-model.umd.js");

const { createModel } = zrModel;

/**
 * 定义Model
 * @param props
 * @returns
 */
function useTestModel(props) {
  const state = {
    ...props,
    count: 0,
  };

  function setCount(count) {
    state.count = count;
  }

  return {
    state,
    setCount,
  };
}

module.exports = createModel(useTestModel);
