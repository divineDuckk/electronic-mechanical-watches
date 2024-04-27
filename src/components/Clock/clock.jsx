import { useState, useEffect } from "react";
import styles from "./clock.module.scss";
const hourArr = 3,
  secArr = 8,
  minArr = 6;

const Clock = ({ tickPerSecond = 1 }) => {
  const [sec, setSec] = useState(new Date().getSeconds());
  const [min, setMin] = useState(new Date().getMinutes());
  const [hour, setHour] = useState(new Date().getHours() % 12);
  const [rotationSecAngle, setSecAngle] = useState((sec / 60) * 360);
  const [rotationMinAngle, setMinAngle] = useState((min / 60) * 360);
  const [rotationHourAngle, setHourAngle] = useState((hour / 12) * 360);
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
    setSecAngle((sec / 60) * 360);
    setMinAngle((min / 60) * 360);
    setHourAngle((hour / 12) * 360);
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
