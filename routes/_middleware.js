export async function handler(request, context) {
  const response = await context.next();
  console.log('got hit', request.url);

  return response;
}
