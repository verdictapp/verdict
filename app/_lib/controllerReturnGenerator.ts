export function successReturn(returned?: any) {
  return {
    success: true,
    errorCode: undefined,
    returned: returned || undefined,
  };
}

export function errorReturn(code: number, returned?: any) {
  return {
    success: false,
    errorCode: code,
    returned: returned || undefined,
  };
}
