export default async function sendHueRequest(colorName: string): Promise<void> {
  try {
    await fetch('/api/hue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ color: colorName }),
    });
  } catch (error) {
    console.error('Failed to update color:', error);
  }
}
