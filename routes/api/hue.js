const isInternal = () =>
  JSON.stringify(Deno.env.get('SG_NETWORK')) === JSON.stringify('internal');

export const handler = {
  async POST(request) {
    const color = (await request.json()).color;
    try {
      await fetch(
        `http://${
          isInternal() ? 'localhost' : '86.25.145.140'
        }:3000/?color=${color}`
      );
    } catch {
      console.error('hue proxy call failed');
    }

    return new Response();
  },
};
