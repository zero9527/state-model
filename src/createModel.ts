import { ModelState, UseModel } from "./types/index";
import { modelHandler } from "./utils/modelHandler";

/**
 * model包装器
 * @param fn
 * @returns
 */
export function createModel<Returns> (useModel: UseModel<Returns>) {
  let copyState: any = {}; // state备份
  const modelState: ModelState = {
    data: { state: {} },
    callbackLists: [], // TODO: 重复注册的问题
  };
  const handler = modelHandler<Returns>({ copyState, modelState, useModel });

  // 通过 `.data` 的方式访问
  Object.defineProperty(handler, "data", {
    get: function () {
      return modelState.data;
    },
  });

  // 正常 useModel 的方式访问
  return handler;
}
