export function successResponse(result?: any) {
  return new Response(
    JSON.stringify({
      errorCode: undefined,
      result: result || undefined,
    })
  );
}

export function errorResponse(code: number, result?: any) {
  return new Response(
    JSON.stringify({
      errorCode: code,
      result: result || undefined,
    })
  );
}
