const assert = require('assert');
const useCountModel = require('./useCountModel');
const useDateModel = require('./useDateModel');

const countModel = useCountModel();
// const countModel2 = useCountModel({ a: 'aaaa' });
const dateModel = useDateModel();

// onStateChange
useCountModel.onStateChange((key, value) => {
  console.log(`useCountModel []`, key, value);
}, []);

// onStateChange
useDateModel.onStateChange((key, value) => {
  console.log(`useDateModel []`, key, value);
}, []);

// onStateChange
useCountModel.onStateChange((key, value) => {
  console.log(`useCountModel ['count']`, key, value);
  assert.strictEqual(key, 'count');
  assert.strictEqual(value, countModel.state.count);
  assert.strictEqual(value, useCountModel.data.state.count);
}, ['count']);

// onStateChange
useDateModel.onStateChange((key, value) => {
  console.log(`useDateModel ['date']`, key, value);
}, ['date']);

// onStateChange
useDateModel.onStateChange((key, value) => {
  // console.log(`useDateModel ['date']`, key, value);
  assert.strictEqual(key, 'date');
  assert.strictEqual(value, dateModel.state.date);
  assert.strictEqual(value, useDateModel.data.state.date);
}, ['date']);

// test
function stateTest() {
  countModel.state.count = 1; // 不能被直接修改
  assert.strictEqual(countModel.state.count, 0);
  assert.strictEqual(useCountModel.data.state.count, 0);

  countModel.setCount(666);
  assert.strictEqual(countModel.state.count, 666);
  assert.strictEqual(useCountModel.data.state.count, 666);

  countModel.setCount(233);
  assert.strictEqual(countModel.state.count, 233);
  assert.strictEqual(useCountModel.data.state.count, 233);

  const date = new Date();
  dateModel.setDate(date);
  assert.strictEqual(dateModel.state.date, date);
  assert.strictEqual(useDateModel.data.state.date, date);

  useCountModel.clear();
  assert.strictEqual(countModel.state.count, undefined);
  assert.strictEqual(useCountModel.data.state.count, undefined);
}

module.exports = stateTest;
