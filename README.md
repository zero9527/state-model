# zr-model

一个无框架依赖、非集中式的状态管理；

支持**单独**多处引入，状态**不需要**作为参数传递；


## Api
- createModel
- onStateChange(`TODO`)


## createModel
创建 `Model` 的包装器


### 编写自定义 `Model`

```ts
import { createModel } from "../src";

interface UseModelState {
  count: number;
}

/**
 * 定义Model
 * @param props
 * @returns
 */
function useTestModel(props: any) {
  const state: UseModelState = {
    ...props,
    count: 0,
  };

  function setCount(count: number) {
    state.count = count;
  }

  return {
    state,
    setCount,
  };
}

export default createModel(useTestModel);
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


## onStateChange
> TODO

状态更新的监听

```ts
const testModel = useTestModel();
console.log(testModel.state.count); // 0

testModel.setCount(6);

testModel.onStateChange((key, value) => {
  console.log(key, value); // 'count', 6
}, ['count']);
```



## 参考
- [hox.js](https://github.com/umijs/hox): 基于 `React Hooks` 状态管理器


> 项目基于 [rollup-starter-lib](https://github.com/rollup/rollup-starter-lib) 创建
