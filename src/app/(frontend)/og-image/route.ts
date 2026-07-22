import type { NextRequest } from 'next/server'

export function GET(request: NextRequest) {
  return Response.redirect(new URL('/brand/open-graph.png', request.url), 308)
}
