import { useState } from "react";
import type { WeatherModel } from "../../Models/WeatherModel";
import { weatherService } from "../../Services/WeatherService";
import styles from "./Weather.module.css";
import { useForm } from "react-hook-form";

export function Weather(): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<WeatherModel>({ mode: "onChange" });

  const [information, setInformation] = useState<WeatherModel | "">();

  async function send(data: WeatherModel) {
    try {
      const result = await weatherService.getWeather(
        data.location.name,
        data.location.country
      );
      setInformation(result);
      console.log("success");
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <div className={styles.Weather}>
      <form onSubmit={handleSubmit(send)}>
        <div className="input-group mb-3">
          <span className="input-group-text">City and Country</span>
          <input
            type="text"
            aria-label="City"
            className="form-control"
            placeholder="City"
            {...register("location.name", {
              required: "City is required!",
              minLength: {
                value: 2,
                message: "City must be at least 2 characters!",
              },
              maxLength: {
                value: 50,
                message: "City must be less then 50 characters!",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "City must contain only letters!",
              },
              setValueAs: (value) => value.trim(),
            })}
          />
          <input
            type="text"
            aria-label="Country"
            className="form-control"
            placeholder="Country"
            {...register("location.country", {
              required: "Country is required!",
              minLength: {
                value: 2,
                message: "Country must be at least 2 characters!",
              },
              maxLength: {
                value: 50,
                message: "Country must be less then 50 characters!",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Country must contain only letters!",
              },
            })}
          />
        </div>
        {errors.location?.name && (
          <span className={styles.Error}>{errors.location.name.message}</span>
        )}
        {errors.location?.country && (
          <span className={styles.Error}>
            {errors.location.country.message}
          </span>
        )}
        <button type="submit" className="btn btn-primary">
          search
        </button>

        {information && typeof information !== "string" && (
          <div className={styles.Info}>
            <h2>
              Weather information for {information.location.name},{" "}
              {information.location.country}
            </h2>
            <p>
              <img src={information.current.condition.icon} />
            </p>
            <p>Last updated: {information.current.last_updated}</p>
            <p>Region: {information.location.region}</p>
            <p>Weather Condition: {information.current.condition.text}</p>
            <p>Temperature: {information.current.temp_c}</p>
            <p>Local time: {information.location.localtime}</p>
            <p>Is day? {information.current.is_day === 0 ? "No" : "Yes"}</p>
          </div>
        )}
      </form>
    </div>
  );
}
