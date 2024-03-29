const zrModel = require("../dist/state-model.umd.js");

const { createModel } = zrModel;

/**
 * useDateModel
 * @param {*} param0 
 * @returns 
 */
module.exports = createModel(function useDateModel({ onChange }) {
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
});
