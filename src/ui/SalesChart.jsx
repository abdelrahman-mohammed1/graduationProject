 

import styled from "styled-components";
import DashboardBox from "../features/Dashboard/DashboardBox";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Heading from "./Heading";
import { useDarkMode } from "../context/DarkModeContext";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const data = [
    { date: "Jan 01", patients: 3, nurses: 1 },
    { date: "Jan 02", patients: 5, nurses: 2 },
    { date: "Jan 03", patients: 8, nurses: 3 },
    { date: "Jan 04", patients: 10, nurses: 4 },
    { date: "Jan 05", patients: 6, nurses: 2 },
    { date: "Jan 06", patients: 9, nurses: 4 },
    { date: "Jan 07", patients: 12, nurses: 5 },
    { date: "Jan 08", patients: 7, nurses: 3 },
    { date: "Jan 09", patients: 15, nurses: 6 },
    { date: "Jan 10", patients: 10, nurses: 5 },
    { date: "Jan 11", patients: 18, nurses: 8 },
    { date: "Jan 12", patients: 20, nurses: 10 },
    { date: "Jan 13", patients: 17, nurses: 7 },
    { date: "Jan 14", patients: 19, nurses: 8 },
    { date: "Jan 15", patients: 22, nurses: 11 },
    { date: "Jan 16", patients: 25, nurses: 12 },
    { date: "Jan 17", patients: 28, nurses: 14 },
    { date: "Jan 18", patients: 30, nurses: 15 },
    { date: "Jan 19", patients: 27, nurses: 13 },
    { date: "Jan 20", patients: 25, nurses: 12 },
    { date: "Jan 21", patients: 23, nurses: 11 },
    { date: "Jan 22", patients: 21, nurses: 10 },
    { date: "Jan 23", patients: 24, nurses: 12 },
    { date: "Jan 24", patients: 22, nurses: 11 },
    { date: "Jan 25", patients: 26, nurses: 13 },
    { date: "Jan 26", patients: 29, nurses: 14 },
    { date: "Jan 27", patients: 32, nurses: 16 },
    { date: "Jan 28", patients: 35, nurses: 18 },
    { date: "Jan 29", patients: 33, nurses: 17 },
    { date: "Jan 30", patients: 31, nurses: 16 },
    { date: "Jan 31", patients: 34, nurses: 17 },
    { date: "Feb 01", patients: 36, nurses: 18 },
    { date: "Feb 02", patients: 38, nurses: 19 },
    { date: "Feb 03", patients: 40, nurses: 20 },
    { date: "Feb 04", patients: 39, nurses: 19 },
    { date: "Feb 05", patients: 37, nurses: 18 },
    { date: "Feb 06", patients: 35, nurses: 17 },
    { date: "Feb 07", patients: 32, nurses: 16 },
    { date: "Feb 08", patients: 30, nurses: 15 },
    { date: "Feb 09", patients: 28, nurses: 14 },
    { date: "Feb 10", patients: 26, nurses: 13 },
    { date: "Feb 11", patients: 25, nurses: 12 },
    { date: "Feb 12", patients: 23, nurses: 11 },
    { date: "Feb 13", patients: 21, nurses: 10 },
    { date: "Feb 14", patients: 19, nurses: 9 },
    { date: "Feb 15", patients: 18, nurses: 8 },
    { date: "Feb 16", patients: 16, nurses: 7 },
    { date: "Feb 17", patients: 14, nurses: 6 },
    { date: "Feb 18", patients: 12, nurses: 5 },
    { date: "Feb 19", patients: 10, nurses: 4 },
    { date: "Feb 20", patients: 8, nurses: 3 },
];

export default function MyAreaChart() {
    const { isDarkMode } = useDarkMode();
    const colors = isDarkMode
        ? {
            totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
            extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
            text: "#e5e7eb",
            background: "#18212f",
        }
        : {
            totalSales: { stroke: "#4f46e5", fill: "#7b92f1" },
            extrasSales: { stroke: "#16a34a", fill: "#88f9b0" },
            text: "#374151",
            background: "#fff",
        };

    return (
        <StyledSalesChart>
            <Heading as='h2'>Nurses per Patients</Heading>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                    data={data}
                    margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
                >
                    <CartesianGrid />
                    <XAxis dataKey="date" />
                    <YAxis label={{ value: 'Patients', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: colors.text, fontSize: 16 } }}
                    />
                    <Tooltip contentStyle={{ backgroundColor: colors.background }} />
                    <Legend />
                    <Area type="monotone" dataKey="patients" stroke={colors.totalSales.stroke} fill={colors.totalSales.fill} />
                    <Area type="monotone" dataKey="nurses" stroke={colors.extrasSales.stroke} fill={colors.extrasSales.fill} />
                </AreaChart>
            </ResponsiveContainer>
        </StyledSalesChart>
    )
}
