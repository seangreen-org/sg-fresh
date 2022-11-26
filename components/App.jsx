import Header from '../components/Header.jsx';
import Heart from '../islands/Heart.jsx';

export default function App(
  props = { color: 'green', emoji: '💚', prefix: '' }
) {
  return (
    <>
      <Header />
      <Heart {...props} />
    </>
  );
}
