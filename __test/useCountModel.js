const zrModel = require("../dist/zr-model.umd.js");

const { createModel } = zrModel;

/**
 * useCountModel
 * @param {*} param0 
 * @returns 
 */
function useCountModel({ onChange }) {
  const state = {
    count: 0,
  };

  function setCount(count) {
    onChange('count', count);
  }

  return {
    state,
    setCount,
  };
}

module.exports = createModel(useCountModel);
