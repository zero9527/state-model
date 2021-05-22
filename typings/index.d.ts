/**
 * 自定义Model
 */
 interface UseModel<R> {
  //  (props: any): R;
  (props: { props: any, onChange: OnChange, localState: CopyState }): UseModelReturns & R;
}

/**
 * 自定义model的返回值
 */
type UseModelReturns = {
  state: { [props: string]: any };
};

/**
 * 自定义model在setState调的辅助函数
 */
// TODO：key 自动获取state下的属性
interface OnChange {
  (params: { key: string, value: any, params?: any }): void;
}

/**
 * 备份的state
 */
interface CopyState {
  [prop: string]: any;
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
declare function createModel<Returns>(useModel: UseModel<Returns>): ModelHandler<UseModelReturns & Returns>;

export { createModel };
