# zr-model

一个无框架依赖、非集中式的状态管理；

支持**单独**多处引入，状态**不需要**作为参数传递；


## 1、Api
### `createModel`
  
自定义 `model` 的包装器

### `onChange`
  
自定义 `model` 在 `setState` 的时候调用

> **仅允许**通过这种方式更新`state`，外部直接修改`state`无效
  

### `onStateChange` (beta)
  
自定义监听 `onChange` 的回调

> 需要在自定义 `model` 内 `setState` 的时候调用一次 `onChange` 方法


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


## 2、编写自定义 `Model`

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
    onChange('count', count);
  }

  return {
    state,
    setCount,
  };
}

module.exports = createModel(useCountModel);
```

## 3、使用自定义 `Model`

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

testModel.state.count = 8; // 无效
console.log(testModel.state.count); // 6
console.log(useTestModel.data.state.count); // 6
```


## 4、框架的响应式支持

编写自定义`model`时候，使用**框架提供**的相应的响应式方法

### Vue 响应式支持

- [`Vue2.6+`] [Vue.observable](https://cn.vuejs.org/v2/api/#Vue-observable)
：让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象。

- [`Vue3.x+`] [Vue.reactive](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive)：返回对象的响应式副本


例：
```js
function useCountModel({ onChange }) {
  const state = {
    count: 0,
  };

  function setCount(count) {
    onChange('count', count);
  }

  // 如在setCount之后，外部引用state.count的地方就会响应式更新了
  Vue.observable(state);

  return {
    state,
    setCount,
  };
}
```

### React 响应式支持
> TODO，不清楚有没有类似上面Vue的外部响应式支持。。。

### 其他
> TODO，不清楚有没有类似上面Vue的外部响应式支持。。。


## 5、参考
- [hox.js](https://github.com/umijs/hox): 基于 `React Hooks` 状态管理器


## 6、最后
项目基于 [rollup-starter-lib](https://github.com/rollup/rollup-starter-lib) 创建
