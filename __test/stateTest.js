const assert = require('assert');
const useTestModel = require('./useTestModel');

const testModel = useTestModel();
const testModel2 = useTestModel();

function stateTest() {
  assert.strictEqual(testModel.state.count, 0);
  assert.strictEqual(useTestModel.data.state.count, 0);
  assert.strictEqual(testModel2.state.count, 0);

  testModel.setCount(6);
  assert.strictEqual(testModel.state.count, 6);
  assert.strictEqual(useTestModel.data.state.count, 6);
  assert.strictEqual(testModel2.state.count, 6);

  testModel.setCount(233);
  assert.strictEqual(testModel.state.count, 233);
  assert.strictEqual(useTestModel.data.state.count, 233);
  assert.strictEqual(testModel2.state.count, 233);
}

module.exports = stateTest;
