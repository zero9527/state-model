/**
 * 自定义Model
 */
 interface UseModel<R> {
  (props: any): R;
}

/**
 * 自定义model在setState调的辅助函数
 */
interface OnChange {
  (params: { key: string, value: any, params: any }): void;
}

/**
 * createModel返回的函数
 */
interface ModelHandler<R> {
  // (params?: { props?: any, keys?: (keyof R)[] }): R;
  (props?: any): R;
  data?: R,
  clear?: () => void;
  onStateChange?: (callback: OnChange, deps?: string[]) => void;
}

/**
 * model包装器
 * @param fn
 * @returns
 */
declare function createModel<Returns>(useModel: UseModel<Returns>): ModelHandler<Returns>;

export { createModel };
