const zrModel = require("../dist/zr-model.umd.js");

const { createModel } = zrModel;

/**
 * useDateModel
 * @param {*} param0 
 * @returns 
 */
function useDateModel({ onChange }) {
  const state = {
    date: new Date()
  };

  function setDate(date) {
    onChange({ key: 'date', value: date });
  }

  return {
    state,
    setDate,
  };
}

module.exports = createModel(useDateModel);
