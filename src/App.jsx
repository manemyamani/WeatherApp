import './App.css'
import Header from './components/Header'
import Dialog from './components/Dialog'
import WeatherCard from './components/WeatherCard';
import { fetchWeatherData } from './util/weatherService';
import { useRef, useState } from 'react'
function App() {
  const refdialog=useRef();
  const [cards,setCards]=useState([]);
   const [loading, setLoading] = useState(false);
  function handleclose(){
    refdialog.current.close();
  }
  async function handleAddLocation(zip,country){
    if(cards.length>10){
        alert("limit of 10 cards reached!");
        return;
    }
    const data=await fetchAndSetCard(zip,country,false);
    if(data?.error){
      return data.error;
    }
    return null;
  }
  async function handleRefresh(zip, country, id) {
    await fetchAndSetCard(zip, country, true, id);
  }
  async function fetchAndSetCard(zip,country,isRefresh=false,id=null){
    try{
      setLoading(true);
      const data=await fetchWeatherData(zip,country);
    if (data.error) return {error:data.error} ;
    
      const cardData = {
        id: isRefresh ? id : Date.now(),
        name: data.name,
        zip,
        country,
        temp: data.main.temp,
        weather: data.weather[0].main,
        lastUpdated: new Date().toLocaleTimeString(),
      };
      if (isRefresh) {
        setCards((prev) => prev.map((c) => (c.id === id ? cardData : c)));
      } else {
        setCards((prev) => [...prev, cardData]);
        handleclose(); 
      }
      return null;
        } catch (err) {
     return {error:err.message};
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <>
  <Header />
  {cards.length < 10 && (
        cards.length === 0 ? (
          <button className='addlocationbutton' onClick={() => refdialog.current.showModal()}>
            Add a location
          </button>
        ) : (
          <button className='addlocationbutton'
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
            }}
            onClick={() => refdialog.current.showModal()}
          >
            Add a location
          </button>
        )
      )}
  <Dialog ref={refdialog} onsubmit={handleAddLocation} onclose={handleclose}/>
  {loading && (
        <p style={{ textAlign: "center", marginTop: "1rem", color: "#cdda3cff", fontWeight: "bold" }}>
          Fetching weather data... 
        </p>)}
   <div className="card-container">
        {cards.map((c) => (
          <WeatherCard key={c.id} card={c} onRefresh={handleRefresh} />
        ))}
      </div>
    </>
  );
}

export default App;

