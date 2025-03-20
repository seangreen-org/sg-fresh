import Header from '../../components/Header.jsx';
import BackgroundImage from '../../islands/2024/Background.jsx';
import Heart from '../../islands/2024/Heart.jsx';

export default function App(props) {
  return (
    <>
      <Header />
      <BackgroundImage />
      <Heart {...props} />
    </>
  );
}
