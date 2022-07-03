import "./Chart.scss";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../config/firebase";

type data = {
  name: string;
  Total: number;
};

export const Chart: React.FC<{ aspect: number; title: string }> = ({ aspect, title }) => {
  const [data, setData] = useState<data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      const twoLastMonth = new Date(new Date().setMonth(today.getMonth() - 2));
      const treeLastMonth = new Date(new Date().setMonth(today.getMonth() - 3));
      const fourLastMonth = new Date(new Date().setMonth(today.getMonth() - 4));
      const fiveLastMonth = new Date(new Date().setMonth(today.getMonth() - 5));
      const sixLastMonth = new Date(new Date().setMonth(today.getMonth() - 6));

      const lastMonthQuery = query(
        collection(db, "orders"),
        where("timeStamp", "<=", today),
        where("timeStamp", ">", lastMonth)
      );
      const lastTwoMonthQuery = query(
        collection(db, "orders"),
        where("timeStamp", "<=", lastMonth),
        where("timeStamp", ">", twoLastMonth)
      );
      const lastTreeMonthQuery = query(
        collection(db, "orders"),
        where("timeStamp", "<=", twoLastMonth),
        where("timeStamp", ">", treeLastMonth)
      );
      const lastFourQuery = query(
        collection(db, "orders"),
        where("timeStamp", "<=", treeLastMonth),
        where("timeStamp", ">", fourLastMonth)
      );
      const lastFiveMonthQuery = query(
        collection(db, "orders"),
        where("timeStamp", "<=", fourLastMonth),
        where("timeStamp", ">", fiveLastMonth)
      );
      const lastSixMonthQuery = query(
        collection(db, "orders"),
        where("timeStamp", "<=", fiveLastMonth),
        where("timeStamp", ">", sixLastMonth)
      );

      const monthsQuery = [
        lastMonthQuery,
        lastTwoMonthQuery,
        lastTreeMonthQuery,
        lastFourQuery,
        lastFiveMonthQuery,
        lastSixMonthQuery,
      ];

      const dates = [today, lastMonth, twoLastMonth, treeLastMonth, fourLastMonth, fiveLastMonth];

      const dbData = [];

      for (let i = 0; i < 6; i++) {
        const monthlyDbData = await getDocs(monthsQuery[i]);
        const monthlySumAmount = getTotalSalesQuery(monthlyDbData.docs);
        dbData.push({
          name: dates[i].toLocaleString("default", { month: "long" }),
          Total: monthlySumAmount,
        });
      }
      setData(dbData.reverse());
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
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
