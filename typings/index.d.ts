/**
 * 自定义Model
 */
interface UseModel<R> {
  (props: any): R;
}

/**
 * createModel返回的函数
 */
interface ModelHandler<R> {
  // (params?: { props?: any, keys?: (keyof R)[] }): R;
  (props?: any): R;
  data?: R,
}

/**
 * model包装器
 * @param fn
 * @returns
 */
declare function createModel<Returns>(useModel: UseModel<Returns>): ModelHandler<Returns>;

export { createModel };
