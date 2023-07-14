import Header from '../components/Header.jsx';
import BackgroundImage from '../islands/Background.jsx';
import SummerBay from '../islands/SummerBay.jsx';

export default function App(props = { emoji: '💚' }) {
  return (
    <>
      <Header />
      <BackgroundImage
        imageUrl="../images/summerbay-min.webp"
        backgroundSize="cover"
      />
      <SummerBay {...props} />
    </>
  );
}
