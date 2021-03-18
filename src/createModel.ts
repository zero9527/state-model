import { ModelState } from "./types/index.d";
import { ModelHandler, UseModel } from "./types/index";

/**
 * model包装器
 * @param fn
 * @returns
 */
export function createModel<Returns>(useModel: UseModel<Returns>) {
  const modelState: ModelState = {
    data: null,
  };

  const handler: ModelHandler<Returns> = (props) => {
    const stateData = useModel(props || {}) as any;
    if (!modelState.data) {
      modelState.data = stateData;
    } else {
      Object.keys(stateData).forEach((key) => {
        modelState.data![key] = stateData[key];
      });
    }
    return modelState.data;
  };

  // 通过 `.data` 的方式访问
  Object.defineProperty(handler, "data", {
    get: function () {
      return modelState.data;
    },
  });

  // 正常 useModel 的方式访问
  return handler;
}
