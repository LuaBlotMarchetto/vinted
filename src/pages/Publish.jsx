import { useState } from "react";
import axios from "axios";

const Publish = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [picture, setPicture] = useState(null);
  //   const [pictureFromCloudinary, setPictureFromCloudinary] = useState();
  //   const [publishOptin, setPublishOptin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let pictureToDisplay;

  const handlePublish = async (e) => {
    e.preventDefault();

    try {
      setErrorMessage("");

      console.log(pictureToDisplay);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("price", price);
      formData.append("city", city);
      formData.append("picture", picture);

      //requête post avec les informations du formulaire
      const response = await axios.post(
        " https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(formData);
      setPicture(response.data.secure_url);
      //   setPictureFromCloudinary(response.data.secure_url);
      setTitle("");
      setDescription("");
      setBrand("");
      setSize("");
      setColor("");
      setCondition("");
      setPrice("");
      setCity("");
    } catch (error) {
      if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs");
      }
      console.error(error.response.data);
    }
  };

  if (picture) {
    pictureToDisplay = URL.createObjectURL(picture);
  }

  return (
    <main className="main-publish">
      <form className="container publish" onSubmit={handlePublish}>
        <h1>Vends ton article</h1>
        <div className="photo-upload publish-card">
          <label htmlFor="upload-photo-input" className="add-photo-button">
            + Ajoute une photo
          </label>
          <input
            type="file"
            name="photo"
            id="upload-photo-input"
            onChange={(event) => {
              setPicture(event.target.files[0]);
            }}
          />
          {pictureToDisplay && (
            <img
              src={pictureToDisplay}
              alt="XXXXX"
              className="picture-display"
            ></img>
          )}
        </div>
        <div className="publish-card">
          <div className="publish-section">
            <h3>Titre</h3>
            <input
              type="text"
              placeholder="ex:Chemise Sézane verte"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="publish-section">
            <h3>Décris ton article</h3>
            <input
              type="text"
              placeholder="ex:porté quelques fois, taille correctement"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="publish-card">
          <div className="publish-section">
            <h3>Marque</h3>
            <input
              type="text"
              placeholder="ex:Zara"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div className="publish-section">
            <h3>Taille</h3>
            <input
              type="text"
              placeholder="ex:L/40/12"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
          <div className="publish-section">
            <h3>Couleur</h3>
            <input
              type="text"
              placeholder="ex:Fushia"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="publish-section">
            <h3>Etat</h3>
            <input
              type="text"
              placeholder="ex:Neuf avec étiquette"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
          </div>
          <div className="publish-section">
            <h3>Lieu</h3>
            <input
              type="text"
              placeholder="ex:Paris"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
        <div className="publish-card">
          <div className="publish-section">
            <h3>Prix</h3>
            <input
              type="text"
              placeholder="ex:0,00€"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="publish-section">
            <input
              type="checkbox"
              id="publish-optin"
              name="publish-optin"
              // checked={publishOptin}
              // onChange={(e) => setPublishOptin(e.target.checked)}
            />
            <label htmlFor="publish-optin">
              Je suis intéressé(e) par les échanges
            </label>
          </div>
        </div>
        <p className="connexion-error-message">{errorMessage}</p>
        <button type="submit" className="publish-button">
          Ajouter
        </button>
      </form>
    </main>
  );
};

export default Publish;
