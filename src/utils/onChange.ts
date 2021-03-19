import { CallbackKey } from './const';
import { CallbackItem } from '../types/index';

/**
 * createModel时传给useModel的onChange函数
 * @param callbackLists 
 * @param key 
 * @param value 
 */
export default function onChange (callbackLists: CallbackItem[], key: string, value: any) {
  callbackLists.forEach(item => {
    const callback = item[key] || item[CallbackKey.COMMON];
    if (callback) callback(key, value);
  });
}
