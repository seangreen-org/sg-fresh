import App from '../components/App.jsx';

export default function Hue(props) {
  return (
    <App hue={props.params?.hue} />
  );
}
