import { useState, useEffect } from "react";

function Meme() {
  const [allMeme, setAllMeme] = useState([]);
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    url: "https://i.imgflip.com/9iz9.jpg",
  });
  const [formData, setFormData] = useState({
    topText: "",
    bottomText: "",
  });

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMeme(data));
  }, []);

  function getMemeImage() {
    const memesArray = allMeme.data.memes;
    const randomNumber = Math.floor(Math.random() * memesArray.length);
    const { url } = memesArray[randomNumber];
    return url;
  }

  function handleFormDataChange(e) {
    const { value, name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          className="form-input"
          placeholder="顶部文字"
          name="topText"
          value={formData.topText}
          onChange={handleFormDataChange}
        />
        <input
          type="text"
          className="form-input"
          placeholder="底部文字"
          name="bottomText"
          value={formData.bottomText}
          onChange={handleFormDataChange}
        />
        <button
          className="form-button"
          onClick={() => setMeme((prev) => ({ ...prev, url: getMemeImage() }))}
        >
          生成表情包 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.url} className="meme-img" />
        <h2 className="meme-text top">{formData.topText}</h2>
        <h2 className="meme-text bottom">{formData.bottomText}</h2>
      </div>
    </main>
  );
}

export default Meme;
