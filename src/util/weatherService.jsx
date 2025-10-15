const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export async function fetchWeatherData(zip, country) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&units=metric&appid=${apiKey}`
    );

    if(!res.ok){
      const err=await res.json();
      return {error:err.message||"error fetching weather"};
    }
    const data = await res.json();

    if (data.cod !== 200) {
      return {error:data.message || 'Error fetching weather!'};
    }

    return data;
  } catch (err) {
    return {error:'Failed to fetch weather'+err.message};
  }
}
