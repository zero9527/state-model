import { CallbackItem } from '../types/index';

/**
 * createModel时传给useModel的onChange函数
 * @param callbackLists 
 * @param key state下的key
 * @param value key对应的值
 * @param params 额外的参数 
 */
export function onChange (callbackLists: CallbackItem[], key: string, value: any, params: any) {
  callbackLists.forEach(item => {
    const emptyDeps = !item.deps.length;
    const includeDep = item.deps.some(dep => dep === key);
    const shouldCallback = emptyDeps || includeDep;
    if (shouldCallback) item.callback({ key, value, params });
  });
}
