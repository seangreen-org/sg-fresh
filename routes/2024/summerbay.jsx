import Header from '../../components/Header.jsx';
import BackgroundImage from '../../islands/2024/Background.jsx';
import SummerBay from '../../islands/2024/SummerBay.jsx';

export default function App(props = { emoji: '💚' }) {
  return (
    <>
      <Header />
      <BackgroundImage imageUrl="../images/summerbay-min.webp" />
      <SummerBay {...props} />
    </>
  );
}
