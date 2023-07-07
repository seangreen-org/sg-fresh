import Header from '../components/Header.jsx';
import Wolf from '../islands/Wolf.jsx';

export default function App(props = { emoji: '💚' }) {
  return (
    <>
      <Header />
      <Wolf {...props} />
    </>
  );
}
