import { Grid, Paper, Typography } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";

function ChartBlogs({ articleStatusCounts }) {
  return (
    <Grid item xs={12} md={6}>
      <Paper sx={{ p: 3, height: 400 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          وضعیت وبلاگ
        </Typography>
        <ResponsivePie
          data={[
            {
              id: "رد شده",
              label: "رد شده",
              value: articleStatusCounts.rejected,
            },
            {
              id: "در انتظار",
              label: "در انتظار",
              value: articleStatusCounts.pending,
            },
            {
              id: "تأیید شده",
              label: "تأیید شده",
              value: articleStatusCounts.approved,
            },
          ]}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.6}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ scheme: "category10" }}
          motionConfig="slow"
        />
      </Paper>
    </Grid>
  );
}

export default ChartBlogs;
