import { useState, useEffect } from "react";
import styles from "./clock.module.scss";
import { calcSecOrMinAngle } from "../../utils/calcSecOrMinAngle";
import { calcHourAngle } from "../../utils/calcHourAngle";
const hourArr = 3,
  secArr = 8,
  minArr = 6;

const Clock = ({ tickPerSecond = 1 }) => {
  const [sec, setSec] = useState(new Date().getSeconds());
  const [min, setMin] = useState(new Date().getMinutes());
  const [hour, setHour] = useState(new Date().getHours() % 12);
  const [rotationSecAngle, setSecAngle] = useState(calcSecOrMinAngle(sec));
  const [rotationMinAngle, setMinAngle] = useState(calcSecOrMinAngle(min));
  const [rotationHourAngle, setHourAngle] = useState(calcHourAngle(hour));
  useEffect(() => {
    const interval = setInterval(() => {
      setSec((prev) => prev + 1);
    }, 1000 / tickPerSecond);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const timeArr = [
    {
      class: styles.sec,
      style: { transform: `rotate(${rotationSecAngle}deg)` },
      length: secArr,
      time: sec,
    },
    {
      class: styles.min,
      style: { transform: `rotate(${rotationMinAngle}deg)` },
      length: minArr,
      time: min,
    },
    {
      class: styles.hour,
      style: { transform: `rotate(${rotationHourAngle}deg)` },
      length: hourArr,
      time: hour,
    },
  ];
  useEffect(() => {
    setSecAngle(calcSecOrMinAngle(sec));
    setMinAngle(calcSecOrMinAngle(min));
    setHourAngle(calcHourAngle(hour));
    if (sec === 60) {
      setMin((prevMin) => prevMin + 1);
      setSec(0);
    }
    if (min === 60) {
      setHour((prevHour) => prevHour + 1);
      setMin(0);
    }
    if (hour === 12) {
      setHour(0);
    }
  }, [sec, min, hour]);
  return (
    <div className={styles.clock}>
      {timeArr.map((obj, i) => {
        return (
          <div key={i} className={obj.class} style={obj.style}>
            {new Array(obj.length).fill(0).map((_, index) => {
              return <p key={index}>{obj.time}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
};
export default Clock;
