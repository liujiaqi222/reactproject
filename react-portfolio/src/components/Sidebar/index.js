import './index.scss';
import { Link, NavLink } from 'react-router-dom';
import LogoS from '../../assets/images/logo-s.png';
import LogoSubtitle from '../../assets/images/logo_sub.png';

function Sidebar() {
  return (
    <div className="nav-bar">
      <Link className="logo" to="/">
        <img src={LogoS} />
        <img className="sub-logo" src={LogoSubtitle} />
      </Link>
      <nav>
        <NavLink exact="true" actvieclassname="active" to="/"></NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
