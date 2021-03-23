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
    state.date = date;
    onChange('date', date);
  }

  return {
    state,
    setDate,
  };
}

module.exports = createModel(useDateModel);
