import { CallbackItem, OnChangeParams } from '../_types/index';

/**
 * createModel时传给useModel的onChange函数
 * @param callbackLists 
 * @param key state下的key
 * @param value key对应的值
 * @param params 额外的参数 
 */
export function changeHandler (callbackLists: CallbackItem[], { key, value, params }: OnChangeParams) {
  callbackLists.forEach(item => {
    const emptyDeps = !item.deps.length;
    const includeDep = item.deps.some(dep => dep === key);
    const shouldCallback = emptyDeps || includeDep;
    // item.callback: 即 onStateChange 的回调函数
    if (shouldCallback) item.callback({ key, value, params });
  });
}
