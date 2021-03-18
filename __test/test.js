const assert = require('assert');
const useTestModel = require('./useTestModel');

function test() {
  const testModel = useTestModel();
  assert.strictEqual(testModel.state.count, 0);

  testModel.setCount(6);
  assert.strictEqual(testModel.state.count, 6);

  testModel.setCount(233);
  assert.strictEqual(testModel.state.count, 233);
}

test();
