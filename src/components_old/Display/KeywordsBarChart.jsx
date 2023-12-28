import React, { PureComponent } from "react";
import theme from "src/components/styles/theme.js"
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

class KeywordsBarChart extends PureComponent {
  static defaultProps = {
    dataKeyY: "usage",
    dataKeyX: "date",
    xLabel: "Date of Usage",
    yLabel: "Dollars",
    dataMax: 10,
    fill: theme.extend.colors.avatar,
    height: 300,
    textColor: theme.extend.colors.gray["2"],
  };
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  // componentDidUpdate(prevProps, prevState) {
  //     // Code to run when component updates
  // }

  // componentWillUnmount() {
  //     // Code to run when component unmounts
  // }

  render() {
    const { data, dataKeyY, dataKeyX, xLabel, yLabel, dataMax, fill, height, textColor } =
      this.props;
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          width="100%"
          height={300}
          data={data}
          className="bg-gray-white"
          margin={{
            top: 30,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={dataKeyX}
            label={{
              value: xLabel,
              position: "middle",
              offset: 0,
              dy: 20,
            }}
            tick={{ fontSize: 12 }}
          />
          <Legend
            aria-label="legend"
            wrapperStyle={{
              top: 0,
              right: 0,
              lineHeight: "40px",
              fill: fill,
              color: textColor,
            }}
          />
          <YAxis
            glyphName={"MT-bench Score"}
            label={{
              value: yLabel,
              angle: -90,
              position: "middle",
              offset: 0,
            }}
            domain={[0, dataMax]}
            ticks={Array.from({ length: 11 }, (_, i) => i)}
          />
          {data?.length > 0 && <Tooltip cursor={false} />}
          <Bar dataKey={dataKeyY} fill={fill} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default KeywordsBarChart;
