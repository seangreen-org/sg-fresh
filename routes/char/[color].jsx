import App from '../../components/App.jsx';

export default function Char(props) {
  return (
    <App color={props.params?.color} emoji="📸" />
  );
}
