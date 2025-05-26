import axios, { AxiosResponse } from "axios";
import { WeatherApi } from "../3-models/weatherApi-model";
import dotenv from "dotenv";

dotenv.config();

class WeatherService {
  private WEATHER_API_KEY = process.env.WEATHER_API_KEY;
  private WEATHER_API_URL = "http://api.weatherapi.com/v1/current.json";

  public async getWeather(city: string, country: string): Promise<WeatherApi> {
    try {
      const response = await axios.get<WeatherApi>(this.WEATHER_API_URL, {
        params: {
          key: this.WEATHER_API_KEY,
          q: `${city}, ${country}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error("Failed to fetch weather data.");
    }
  }
}

export const weatherService = new WeatherService();
