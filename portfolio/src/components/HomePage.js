import '../App.css';
import { useNavigate } from "react-router-dom";
import UploadComponent from './UploadComponent';

function HomePage() {
  const navigate = useNavigate();

  const goToDisplayPage = () => {
    navigate('/display');
  };

  return (
    <div>
      <UploadComponent/>
      <button className='display-button' onClick={goToDisplayPage}>Go to Display</button>
    </div>
  );
}

export default HomePage;
