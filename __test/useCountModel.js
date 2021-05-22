const zrModel = require("../dist/zr-model.umd.js");

const { createModel } = zrModel;

/**
 * useCountModel
 * @param {*} param0 
 * @returns 
 */

module.exports = createModel(function useCountModel({ props, onChange }) {
  const state = {
    count: 0,
  };

  console.log(props);

  function setCount(newCount) {
    onChange({ key: 'count', value: newCount  })
  }

  return {
    state,
    setCount,
  };
});
