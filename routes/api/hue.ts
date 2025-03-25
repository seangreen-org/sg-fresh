const isInternal = () =>
  JSON.stringify(Deno.env.get('SG_NETWORK')) === JSON.stringify('internal');

export const handler = {
  async POST(request: Request): Promise<Response> {
    const color = (await request.json()).color;

    try {
      await fetch(
        `http://${
          isInternal() ? 'localhost' : '86.13.194.207'
        }:3000/?color=${color}`,
      );
    } catch {
      console.error('hue proxy call failed');
    }

    console.log('api/hue', 'changed color to', color);
    return new Response();
  },
};
