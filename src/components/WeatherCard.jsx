import styles from './WeatherCard.module.css';

function WeatherCard({ card, onRefresh }) {
  return (
    <div className={styles.weatherCard}>
      <h2>{card.name}</h2>
      <p>{card.zip}, {card.country}</p>
      <p>Temp: {card.temp}°C</p>
      <p>{card.weather}</p>
      <p className={styles.updatedText}>Last refreshed: {card.lastUpdated}</p>
      <button
        className={styles.refreshbutton}
        onClick={() => onRefresh(card.zip, card.country, card.id)}
      >
        Refresh
      </button>
    </div>
  );
}

export default WeatherCard;
