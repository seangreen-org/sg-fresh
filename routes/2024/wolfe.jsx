import Header from '../../components/Header.jsx';
import BackgroundImage from '../../islands/Background.jsx';
import Wolf from '../../islands/Wolf.jsx';

export default function App(props = { emoji: '💚' }) {
  return (
    <>
      <Header />
      <BackgroundImage />
      <Wolf {...props} />
    </>
  );
}
