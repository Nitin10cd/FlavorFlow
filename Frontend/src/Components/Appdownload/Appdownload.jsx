import './Appdownload.css';
import playStore from '../../../public/importantsvg/frontend_assets/play_store.png';
import appStore from '../../../public/importantsvg/frontend_assets/app_store.png';

const Appdownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p style={{"fontSize" : "30px"}}>For a Better Experience, Download <br /> She Cook We Eat App</p>
      <div className="app-download-platform">
        <img src={playStore} alt="Get it on Google Play" />
        <img src={appStore} alt="Download on the App Store" />
      </div>
    </div>
  );
};

export default Appdownload;
