import Header from '../../components/Header.jsx';
import BackgroundImage from '../../islands/2024/Background.jsx';
import Wolf from '../../islands/2024/Wolf.jsx';

export default function App(props = { emoji: '💚' }) {
  return (
    <>
      <Header />
      <BackgroundImage />
      <Wolf {...props} />
    </>
  );
}
