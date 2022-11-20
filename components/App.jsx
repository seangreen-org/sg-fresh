import Header from '../components/Header.jsx';
import Heart from '../islands/Heart.jsx';

export default function App({ color = 'green' }) {
  return (
    <>
      <Header />
      <Heart color={color} />
    </>
  );
}
