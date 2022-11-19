import App from '../components/App.jsx';

export default function Hue(props) {
  const hue = props.params?.hue;
  console.log('Hue degrees', hue);

  if (hue > 360) {
    throw new Error('Too many degrees');
  }

  return (
    <App hue={props.params?.hue} />
  );
}
