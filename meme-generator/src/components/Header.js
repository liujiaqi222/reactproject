import TrollFace from "../images/troll-face.png";
import "./style.css";
function Header() {
  return (
    <header className="header">
      <img src={TrollFace} className="header-image" />
      <h2 className="header-title">Meme Generator</h2>
    </header>
  );
}

export default Header;
