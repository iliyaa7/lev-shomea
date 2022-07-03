import "./Featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { useEffect } from "react";

export const Featured = () => {
  const [amount, setAmount] = useState(0);
  const [weeklyAmount, setWeeklyAmount] = useState(0);
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const target = 1000;

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const last24Hours = new Date(new Date().setHours(today.getHours() - 24));
      const lastWeek = new Date(new Date().setHours(today.getDay() - 24 * 7));
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));

      const lastDayQuery = query(
        collection(db, "orders"),
        where("timeStamp", "<=", today),
        where("timeStamp", ">", last24Hours)
      );
      const lastWeekQuery = query(
        collection(db, "orders"),
        where("timeStamp", "<=", today),
        where("timeStamp", ">", lastWeek)
      );

      const lastMonthQuery = query(
        collection(db, "orders"),
        where("timeStamp", "<=", today),
        where("timeStamp", ">", lastMonth)
      );

      const lastDayData: any = await getDocs(lastDayQuery);
      const lastWeekData: any = await getDocs(lastWeekQuery);
      const lastMonthData: any = await getDocs(lastMonthQuery);
      setAmount(getTotalSalesQuery(lastDayData.docs));
      setWeeklyAmount(getTotalSalesQuery(lastWeekData.docs));
      setMonthlyAmount(getTotalSalesQuery(lastMonthData.docs));
    };
    fetchData();
  }, []);

  const getTotalSalesQuery = (data: any) => {
    if (!data.length) return 0;
    return data?.reduce((sum: number, doc: any) => {
      return (sum += doc.data().totalAmount);
    }, 0);
  };

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={(amount / target) * 100}
            text={`${((amount / target) * 100).toFixed(0)}%`}
            strokeWidth={5}
          />
        </div>
        <p className="title">Total sales made - last 24 hours</p>
        <p className="amount">₪{amount}</p>
        <p className="desc">Previous transactions processing. Last payments may not be included.</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">₪{target}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">₪{weeklyAmount}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">₪{monthlyAmount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
