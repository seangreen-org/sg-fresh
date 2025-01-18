import App from './index.jsx';

export default function Color(props) {
  const color = props.params?.color;

  return (
    <App color={color} />
  );
}
