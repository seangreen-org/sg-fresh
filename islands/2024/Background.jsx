import { useEffect, useState } from 'preact/hooks';

const BackgroundImage = ({ imageUrl = '../images/highover-min.webp' }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setIsLoaded(true);
    };
  }, [imageUrl]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        transition: 'opacity 0.2s',
        opacity: isLoaded ? 1 : 0,
        zIndex: 0,
      }}
    />
  );
};

export default BackgroundImage;
