export function successResponse(result?: any) {
  return new Response(
    JSON.stringify({
      success: true,
      result: result || undefined,
    })
  );
}

export function errorResponse(code: number, result?: any) {
  return new Response(
    JSON.stringify({
      success: false,
      errorCode: code,
      result: result || undefined,
    })
  );
}
