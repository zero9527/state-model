const zrModel = require("../dist/zr-model.umd.js");

const { createModel } = zrModel;

/**
 * useCountModel
 * @param {*} param0 
 * @returns 
 */
function useCountModel({ props, onChange }) {
  const state = {
    count: 0,
  };

  console.log(props);

  function setCount(count) {
    onChange('count', count);
  }

  return {
    state,
    setCount,
  };
}

module.exports = createModel(useCountModel);
