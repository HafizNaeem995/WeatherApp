async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (city === "") {
    resultDiv.innerHTML = '<p class="error">Please enter a city name.</p>';
    return;
  }

  const apiKey = "bbc1c6b3733d40ee88915249251006"; // Your API key
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=yes`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("City not found or invalid response");
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const weather = `
      <p><strong>City:</strong> ${data.location.name}</p>
      <p><strong>Region:</strong> ${data.location.region}</p>
      <p><strong>Country:</strong> ${data.location.country}</p>
      <p><strong>Temperature:</strong> ${data.current.temp_c} °C</p>
      <p><strong>Condition:</strong> ${data.current.condition.text}</p>
      <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.current.wind_kph} km/h</p>
      <p><strong>AQI (Air Quality):</strong> ${data.current.air_quality.pm2_5}</p>
    `;

    resultDiv.innerHTML = weather;
  } catch (error) {
    resultDiv.innerHTML = `<p class="error">${error.message}</p>`;
  }
}
