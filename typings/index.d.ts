/**
 * 自定义Model
 */
interface UseModel<R> {
  (props: any): R;
}

interface OnChange {
  (key: string, value: any): void;
}

/**
 * createModel返回的函数
 */
interface ModelHandler<R> {
  // (params?: { props?: any, keys?: (keyof R)[] }): R;
  (props?: any): R;
  data?: R,
  onStateChange?: (callback: OnChange, key?: string) => void;
}

/**
 * model包装器
 * @param fn
 * @returns
 */
declare function createModel<Returns>(useModel: UseModel<Returns>): ModelHandler<Returns>;

export { createModel };
