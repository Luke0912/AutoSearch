import styles from "./BasicCard.module.css";

const BasicCard = ({ e, setIsOpen, dataToIndex }) => {
  const handleDetailCard = () => {
    setIsOpen(true);
    dataToIndex(e);
  };
  return (
    <>
      <div className={styles.cardOutline} onClick={handleDetailCard}>
        <div className={styles.cardImage}>
          <img src={e.image} alt="cardImage" />
        </div>
        <div className={styles.cardName}>
          <h4>{e.name}</h4>
        </div>
        <div className={styles.cardStatusColorStatusAndSpecies}>
          <div
            className={
              e.status === "Alive"
                ? styles.cardStatusColor_alive
                : styles.cardStatusColor_dead
            }
          ></div>
          <div className={styles.cardStatusAndSpecies}>
            <h5>{e.status}</h5>
            <h5>-</h5>
            <h5>{e.species}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicCard;
