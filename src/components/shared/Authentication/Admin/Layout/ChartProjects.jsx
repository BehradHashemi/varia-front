import { Grid, Paper, Typography } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";

function ChartProjects() {
  const data = [
    {
      id: "پروژه‌ها",
      data: [
        { x: "فروردین", y: 10 },
        { x: "اردیبهشت", y: 15 },
        { x: "خرداد", y: 20 },
        { x: "تیر", y: 25 },
        { x: "مرداد", y: 30 },
        { x: "شهریور", y: 35 },
      ],
    },
  ];
  return (
    <Grid item xs={12} md={6}>
      <Paper sx={{ p: 3, height: 400 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          پیشرفت پروژه‌ها
        </Typography>
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "زمان",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "تعداد",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          useMesh={true}
        />
      </Paper>
    </Grid>
  );
}

export default ChartProjects;
