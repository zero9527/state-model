import _onChange from "./utils/onChange";
import {
  ModelState, 
  ModelHandler, 
  UseModel, 
  OnChange,
} from "./types/index";

/**
 * model包装器
 * @param fn
 * @returns
 */
export function createModel<Returns>(useModel: UseModel<Returns>) {
  let initStateData = {};
  const modelState: ModelState = {
    data: null,
    callbackLists: [], // TODO: 重复注册的问题
  };

  /**
   * 给useModel在修改state的时候调用的
   * @param key 
   * @param value 
   */
  function onChange (key: string, value: any) {
    _onChange(modelState.callbackLists, key, value);
  }

  /**
   * 默认createModel返回的函数
   * @param props 
   * @returns 
   */
  const handler: ModelHandler<Returns> = (props = {}) => {
    const stateData = useModel.call(null, { onChange, props }) as any;
    if (!modelState.data) {
      initStateData = stateData;
      modelState.data = stateData;
      modelState.callbackLists = [];
    } else {
      Object.keys(stateData).forEach((key) => {
        modelState.data![key] = stateData[key];
      });
    }
    return modelState.data;
  };

  // 初始化数据
  handler.clear = function clear () {
    modelState.data.state = {};
    modelState.callbackLists.length = 0;
  }
  
  // 状态变更的通知
  handler.onStateChange = function onStateChange(callback: OnChange, deps: string[] = []) {
    const hasDep = Object.keys(modelState.data.state).some(key => deps.includes(key));
    if (hasDep || !deps?.length) {
      modelState.callbackLists.push({ deps, callback });
    } else {
      console.warn(`[onStateChange]WARN: 请检查[deps]: ${
        JSON.stringify(deps)
      }是否存在state中! state:`, modelState.data.state);
    }
  }

  // 通过 `.data` 的方式访问
  Object.defineProperty(handler, "data", {
    get: function () {
      return modelState.data;
    },
  });

  // 正常 useModel 的方式访问
  return handler;
}
