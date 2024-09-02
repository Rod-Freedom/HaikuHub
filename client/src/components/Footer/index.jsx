import { useLocation, useNavigate } from 'react-router-dom';
import icon from '/favicon.png';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="flex flex-row justify-center items-center w-full p-4">
      <div className="text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        
        {
          <a href='https://github.com/Rod-Freedom/HaikuHub' target='_blank'>
          <img id='footerIcon' src={icon} alt="HH icon"/>
        </a>
        }
      </div>
    </footer>
  );
};

export default Footer;
