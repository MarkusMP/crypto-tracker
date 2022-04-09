import { useEffect, useState } from "react";
import "./CoinInfo.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getHistoricData } from "../../features/crypto/cryptoSlice";
import { Line } from "react-chartjs-2";
import { chartDays } from "../../config/data";
import SelectButton from "../SelectButton/SelectButton";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
interface IProps {
  id: string;
}

const CoinInfo = ({ id }: IProps) => {
  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
  );
  const dispatch = useAppDispatch();
  const [days, setDays] = useState(1);
  const [flag, setflag] = useState(false);

  const { historicalChart } = useAppSelector((state) => state.crypto);
  const { currency } = useAppSelector((state) => state.currency);

  useEffect(() => {
    dispatch(getHistoricData({ id: id.toLowerCase(), days }));
    setflag(true);
  }, [dispatch, id, days, currency]);
  return (
    <div className="container-info">
      {historicalChart && flag && (
        <>
          <Line
            data={{
              labels: historicalChart?.prices.map((coin) => {
                // @ts-ignore
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  // @ts-ignore
                  data: historicalChart?.prices.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div className="select-buttons">
            {chartDays.map((day) => (
              <SelectButton
                key={day.value}
                onClick={() => {
                  setDays(day.value);
                  setflag(false);
                }}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinInfo;
