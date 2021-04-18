import { onChange as _onChange } from "./onChange";
import { CopyState, ModelHandler, ModelState, UseModel, OnChange } from "../types/index";

/**
 * 数据处理逻辑
 * @returns handler
 */
export function modelHandler<UseModelReturns>({
  copyState,
  modelState,
  useModel,
}: {
  copyState: CopyState;
  modelState: ModelState;
  useModel: UseModel<UseModelReturns>;
}) {
  let localProps = {}; // handler的参数props
  let setterEnable = false; // 修改state的标记
  let innerSetState = false; // 内部更新标记

  // 内部更新
  function setInnerSetState (value: boolean) {
    innerSetState = value;
    if (value) {
      setTimeout(() => innerSetState = false, 0);
    }
  }

  // 设置是否允许Setter，
  // 防止外部直接修改state（只能通过onChange的方式修改）
  function setSetterEnable (value: boolean) {
    setterEnable = value;
  }

  /**
   * 默认createModel返回的函数
   * @param props
   * @returns
   */
  const handler: ModelHandler<ReturnType<UseModel<UseModelReturns>>> = (_props: any) => {
    // props 只在第一次传入的时候生效
    const props = !Object.keys(modelState.data.state).length 
      ? Object.freeze(_props)
      : localProps;
    const stateData = useModel.call(null, { props, onChange }) as any;
    if (!stateData.state) {
      console.warn("自定义model需要返回值对象中不存在state字段！");
      return;
    }
    if (!Object.keys(modelState.data.state).length) {
      localProps = props;
      modelState.data = stateData;
      copyState = { ...stateData.state };
      modelState.data.state = stateData.state;
      modelState.callbackLists = [];
    } else {
      Object.keys(stateData).forEach((key) => {
        if (key === "state") copyState = { ...stateData[key] };
        modelState.data![key] = stateData[key];
      });
    }
    stateSetterHandler();
    return modelState.data;
  };

  // 初始化数据
  handler.clear = function clear() {
    setSetterEnable(true);
    copyState = {};
    localProps = {};
    modelState.data = { state: {} };
    modelState.callbackLists.length = 0;
  };

  // 状态变更的通知
  handler.onStateChange = function onStateChange(
    callback: OnChange,
    deps: string[] = []
  ) {
    const hasDeps = Object.keys(modelState.data.state).some((key) =>
      deps.includes(key)
    );
    if (hasDeps || !deps?.length) {
      modelState.callbackLists.push({ deps, callback });
    } else {
      console.warn(
        `[onStateChange]WARN: 请检查[deps]: ${JSON.stringify(
          deps
        )}是否存在state中! state:`,
        modelState.data.state
      );
    }
  };

  // 给useModel在修改state的时候调用的
  function onChange(key: string, value: any) {
    if (modelState.data.state.hasOwnProperty(key)) {
      setSetterEnable(true);
      modelState.data.state[key] = value;
    }
    _onChange(modelState.callbackLists, key, value);
  }

  // state更新时setter的处理
  function stateSetterHandler () {
    Object.keys(modelState.data.state).forEach(key => {
      Object.defineProperty(modelState.data.state, key, {
        configurable: true,
        enumerable: true,
        get () { 
          return copyState[key]; 
        },
        set (value) {
          if (setterEnable) {
            setSetterEnable(false);
            setInnerSetState(true);
            copyState[key] = value;
            modelState.data.state[key] = value;
          } else if (!innerSetState) {
            console.log('不允许从外部单独修改"state"，请从"model"内部定义"setState"方法并调用"onChange"的方式修改');
          }
        }
      });
    });  
  }

  return handler;
}
