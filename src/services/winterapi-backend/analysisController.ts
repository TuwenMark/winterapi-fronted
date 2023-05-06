// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** listTopInterfaceInvoke GET /api/interface/invoke/top/${param0} */
export async function listTopInterfaceInvokeUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listTopInterfaceInvokeUsingGETParams,
  options?: { [key: string]: any },
) {
  const { topN: param0, ...queryParams } = params;
  return request<API.BaseResponseListInterfaceInvokeVO>(`/api/interface/invoke/top/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
