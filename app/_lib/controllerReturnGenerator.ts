export function successReturn(returned?: any) {
  return {
    errorCode: undefined,
    returned: returned || undefined,
  };
}

export function errorReturn(code: number, returned?: any) {
  return {
    errorCode: code,
    returned: returned || undefined,
  };
}
