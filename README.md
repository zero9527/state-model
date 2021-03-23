# zr-model

一个无框架依赖、非集中式的状态管理；

支持**单独**多处引入，状态**不需要**作为参数传递；


## Api
- `onChange`: 自定义 `model` 在 `setState` 的时候调用
- `createModel`: 自定义 `model` 的外出容器
- `onStateChange`(`beta`): 自定义监听 `onChange` 的回调


## onChange
如: 
```js
function useCountModel({ onChange }) {
  const state = {
    count: 0,
  };

  function setCount(count) {
    state.count = count;
    onChange('count', count);
  }
  // ...
}
```

## createModel
创建 `Model` 的包装器


### 编写自定义 `Model`

```ts
// __test/useCountModel.js
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
    state.count = count;
    onChange('count', count);
  }

  return {
    state,
    setCount,
  };
}

module.exports = createModel(useCountModel);
```

### 使用自定义 `Model`

- 正常引用: `testModel.state`
- 特殊引用: `useTestModel.data.state`

```ts
import useTestModel from './useTestModel';

const testModel = useTestModel();
// 正常引用
console.log(testModel.state.count); // 0
// 不需要执行 `useTestModel()` 时引用
console.log(useTestModel.data.state.count); // 0

testModel.setCount(6);

console.log(testModel.state.count); // 6
console.log(useTestModel.data.state.count); // 6
```

## props
自定义 `model` 接收的外部参数

> TODO，出来多次调用自定义 `model` 的 `props` 覆盖/合并问题


## onStateChange
> v0.1.1(beta)

状态更新的监听，需要在自定义 `model` 内 setState 的时候调用一次 `onChange` 方法


参数 `params`
- callback: `(key: string, value: any): void;`
- deps: `string[]`

```ts
const countModel = useCountModel();
console.log(countModel.state.count); // 0

  // 调用下面 setCount 之后执行回调函数
useCountModel.onStateChange((key, value) => {
  console.log(key, value); // 'count', 6
}, ['count']);

countModel.setCount(6);
console.log(countModel.state.count); // 6
console.log(useCountModel.data.state.count); // 6
```



## 参考
- [hox.js](https://github.com/umijs/hox): 基于 `React Hooks` 状态管理器


> 项目基于 [rollup-starter-lib](https://github.com/rollup/rollup-starter-lib) 创建
