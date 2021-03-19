/**
 * 自定义Model
 */
export interface UseModel<R> {
  (props: any): R;
}

export interface OnChange {
  (key: string, value: any): void;
}

export interface CallbackItem {
  [key: string]: OnChange;
}

/**
 * createModel的state
 */
export interface ModelState {
  data: any;
  callbackLists: CallbackItem[];
}

/**
 * createModel返回的函数
 */
export interface ModelHandler<R> {
  // (params?: { props?: any, keys?: (keyof R)[] }): R;
  (props?: any): R;
  data?: R,
  onStateChange?: (callback: OnChange, key?: string) => void;
}
