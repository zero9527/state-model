import { CallbackItem } from '../types/index';

/**
 * createModel时传给useModel的onChange函数
 * @param callbackLists 
 * @param key 
 * @param value 
 */
export function onChange (callbackLists: CallbackItem[], key: string, value: any) {
  callbackLists.forEach(item => {
    const emptyDeps = !item.deps.length;
    const includeDep = item.deps.some(dep => dep === key);
    const shouldCallback = emptyDeps || includeDep;
    if (shouldCallback) item.callback(key, value);
  });
}
