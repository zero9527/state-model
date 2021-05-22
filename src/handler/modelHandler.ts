import { changeHandler } from "./changeHandler";
import { CopyState, ModelHandler, ModelState, UseModel, OnChange, OnChangeParams } from "../_types/index";

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
    // localState：闭包中的本地state
    const modelRuturns = useModel.call(null, { props, localState: copyState, onChange }) as any;
    if (!modelRuturns.state) {
      console.warn("自定义model需要返回值对象中不存在state字段！");
      return;
    }
    if (!Object.keys(modelState.data.state).length) {
      localProps = props;
      modelState.data = modelRuturns;
      copyState = { ...modelRuturns.state };
      modelState.data.state = modelRuturns.state;
      modelState.callbackLists = [];
    } else {
      Object.keys(modelRuturns).forEach((key) => {
        if (key === "state") copyState = { ...modelRuturns[key] };
        modelState.data![key] = modelRuturns[key];
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
  function onChange({ key, value, params }: OnChangeParams) {
    if (modelState.data.state.hasOwnProperty(key)) {
      setSetterEnable(true);
      modelState.data.state[key] = value;
    }
    changeHandler(modelState.callbackLists, { key, value, params });
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
