import Header from '../../components/Header.jsx';
import BackgroundImage from '../../islands/Background.jsx';
import Heart from '../../islands/Heart.jsx';

export default function App(props) {
  return (
    <>
      <Header />
      <BackgroundImage />
      <Heart {...props} />
    </>
  );
}
