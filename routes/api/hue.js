const isInternal = () =>
  JSON.stringify(Deno.env.get('SG_NETWORK')) === JSON.stringify('internal');

export const handler = {
  async POST(request) {
    const rotation = (await request.json()).hue;
    fetch(
      `http://${
        isInternal ? 'localhost' : '86.25.145.140'
      }:3000/?rotation=${rotation}`
    );

    return new Response();
  },
};
