/**
 * 自定义Model
 */
 export interface UseModel<R> {
  (props: any): R;
}

/**
 * 自定义model在setState调的辅助函数
 */
export interface OnChange {
  (params: { key: string, value: any, params: any }): void;
}

/**
 * stateChange 的回调函数相关
 */
export interface CallbackItem {
  callback: OnChange;
  deps: string[];
}

/**
 * createModel的state
 */
export interface ModelState {
  data: any;
  callbackLists: CallbackItem[];
}

/**
 * 备份的state
 */
export interface CopyState {
  [prop: string]: any;
}

/**
 * createModel返回的函数
 */
export interface ModelHandler<R> {
  // (params?: { props?: any, keys?: (keyof R)[] }): R;
  (props?: any): R;
  data?: R,
  clear?: () => void;
  onStateChange?: (callback: OnChange, deps?: string[]) => void;
}
