export function GET(request: Request, { params }) {
  return new Response(JSON.stringify(params));
}
