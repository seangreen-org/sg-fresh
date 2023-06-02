import App from '../../components/App.jsx';

export default function Rotation(props) {
  return (
    <App rotation={props.params?.rotation} />
  );
}
