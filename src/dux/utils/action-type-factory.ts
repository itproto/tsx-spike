import { appName } from '../../config/app';

const concat = (...params: any[]) => params.join('/');
export const createActionType = (...rest: any[]) => concat('@@', appName, rest);

const enum AsyncActions {
  init = 'INIT',
  request = 'REQ',
  success = 'SUCC',
  error = 'FETCH_ERR',
  invalidate = 'INVALIDATE'
}

export const createAsyncActionTypes = (base: string, ...rest: any[]) => {
  const ca = (asyncType: AsyncActions) => () =>
    createActionType(base, rest.concat(asyncType));
  return {
    init: ca(AsyncActions.init),
    request: ca(AsyncActions.request),
    success: ca(AsyncActions.success),
    error: ca(AsyncActions.error),
    invalidate: ca(AsyncActions.invalidate)
  };
};
