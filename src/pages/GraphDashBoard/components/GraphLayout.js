import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export const GraphLayout = ({ selectedDate, formatXAxis, dataKey, stroke }) => {
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <LineChart
        width={800}
        height={300}
        data={selectedDate}
        margin={{
          top: 40,
          right: 30,
          left: 0,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="created_at" tickFormatter={formatXAxis} />
        <YAxis type="number" domain={['dataMin - 5.0', 'dataMax + 15.0']} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={stroke}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
