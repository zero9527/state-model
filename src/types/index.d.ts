/**
 * 自定义Model
 */
export interface UseModel<R> {
  (props: any): R;
}

/**
 * createModel的state
 */
export interface ModelState {
  data: any;
}

/**
 * createModel返回的函数
 */
export interface ModelHandler<R> {
  // (params?: { props?: any, keys?: (keyof R)[] }): R;
  (props?: any): R;
  data?: R,
}
