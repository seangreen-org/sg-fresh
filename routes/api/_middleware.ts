import { FreshContext } from "$fresh/server.ts";

interface State {
  data: string;
}

export async function handler(request: Request, context: FreshContext<State>) {
  const response = await context.next();
  console.log('got hit', request);

  return response;
}
