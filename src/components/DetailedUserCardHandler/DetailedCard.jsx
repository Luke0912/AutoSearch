import CloseIcon from "@mui/icons-material/Close";
import ReactDom from "react-dom";
import styles from "./DetailedCard.module.css";

const DetailedCard = ({ open, toDetail, setIsOpen }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  if (!open) return null;
  return ReactDom.createPortal(
    <>
      {toDetail.map((e) => (
        <div className={styles.overlay} onClick={handleClose}>
          <div className={styles.DetailedCardOutline}>
            <div
              className={
                styles.DetailedCardImageNameStatusColorStatusAndSpecies
              }
            >
              <div className={styles.DetailedCardImage}>
                <img src={e.image} alt="cardImage" />
              </div>
              <div
                className={styles.DetailedCardNameStatusColorStatusAndSpecies}
              >
                <div className={styles.DetailedCardName}>
                  <CloseIcon
                    style={{
                      color: "grey",
                      marginLeft: "170px",
                      backgroundColor: "white",
                    }}
                    onClick={handleClose}
                  ></CloseIcon>
                  <h3>{e.name}</h3>
                </div>
                <div className={styles.DetailedCardStatusColorStatusAndSpecies}>
                  <div
                    className={
                      e.status === "Alive"
                        ? styles.DetailedCardStatusColor_alive
                        : styles.DetailedCardStatusColor_dead
                    }
                  ></div>
                  <div className={styles.DetailedCardStatusAndSpecies}>
                    <h5>{e.status}</h5>
                    <h5>-</h5>
                    <h5>{e.species}</h5>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className={styles.DetailedCardSpeciesInfo}>
              <div>
                <p>Gender</p>
                <h5>{e.gender}</h5>
              </div>
              <div>
                <p>Location</p>
                <h5>{e.location.name}</h5>
              </div>
              <div>
                <p>Species</p>
                <h5>{e.species}</h5>
              </div>
              <div>
                <p>Origin</p>
                <h5>{e.origin.name}</h5>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>,
    document.getElementById("portal")
  );
};

export default DetailedCard;
