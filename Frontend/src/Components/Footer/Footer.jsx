import './Footer.css';
import Logo from '../../../public/importantsvg/admin_assets/logo.png';
import Fb from '../../../public/importantsvg/frontend_assets/facebook_icon.png';
import Twitter from '../../../public/importantsvg/frontend_assets/twitter_icon.png';
import LinkedIn from '../../../public/importantsvg/frontend_assets/linkedin_icon.png';

const Footer = () => {
  return (
    <div className='footer' id='foot'>
      <div className="footer-content">

        {/* Left Section */}
        <div className='footer-content-left'>
          <h2 src={Logo} alt="Logo" className="footer-logo">Food-HUB</h2>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, quia, quidem aspernatur sunt alias quod cum magnam natus iusto deserunt, aperiam officia ad nobis nam modi architecto exercitationem dolor optio.</p>
          <div className="footer-social-icons">
            <a href="#"><img src={Fb} alt="Facebook" /></a>
            <a href="#"><img src={Twitter} alt="Twitter" /></a>
            <a href="#"><img src={LinkedIn} alt="LinkedIn" /></a>
          </div>
        </div>

        {/* Center Section */}
        <div className='footer-content-center'>
          <h2>Excellence Taste</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Delivery</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className='footer-content-right'>
          <h2>Get in Touch</h2>
          <ul>
            <li><a href="tel:7906112185">7906112185</a></li>
            <li><a href="mailto:nsaxenacse@gmail.com">nsaxenacse@gmail.com</a></li>
          </ul>
        </div>

      </div>

      <hr />

      <p className='footer-copyright'>Copyright &copy; 2025 @foodFlavour - All Rights Reserved</p>
    </div>
  );
};

export default Footer;
