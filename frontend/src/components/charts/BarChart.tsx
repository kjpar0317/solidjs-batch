import { createEffect, on, onMount } from "solid-js";
import * as echarts from "echarts";

export function BarChart() {
  let chartRef: any;

  //   createEffect(
  //     on(
  //       chartRef,
  //       (ref) => {
  //         console.log(ref);
  //       },
  //       { defer: true }
  //     )
  //   );

  onMount(() => {
    console.log(chartRef);

    var myChart = echarts.init(chartRef);

    // Draw the chart
    myChart.setOption({
      title: {
        text: "ECharts Getting Started Example",
      },
      grid: {
        width: "auto",
        height: "100vh",
      },
      tooltip: {},
      xAxis: {
        data: ["shirt", "cardigan", "chiffon", "pants", "heels", "socks"],
      },
      yAxis: {},
      series: [
        {
          name: "sales",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
  });

  return (
    <div ref={chartRef} class="w-full h-full">
      asdfasdf
    </div>
  );
}
