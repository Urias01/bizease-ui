import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  XAxis,
  Bar,
  BarChart,
  ResponsiveContainer,
  YAxis,
} from "recharts";

const response = [
  { month: "Jan", buyingTotal: 1000, sellingTotal: 1500 },
  { month: "Feb", buyingTotal: 1200, sellingTotal: 1600 },
  { month: "Mar", buyingTotal: 1300, sellingTotal: 1700 },
  { month: "Apr", buyingTotal: 1400, sellingTotal: 1800 },
  { month: "May", buyingTotal: 1500, sellingTotal: 1900 },
  { month: "Jun", buyingTotal: 1600, sellingTotal: 2000 },
  { month: "Jul", buyingTotal: 1700, sellingTotal: 2100 },
  { month: "Aug", buyingTotal: 1800, sellingTotal: 2200 },
  { month: "Sep", buyingTotal: 1900, sellingTotal: 2300 },
  { month: "Oct", buyingTotal: 2000, sellingTotal: 2400 },
  { month: "Nov", buyingTotal: 2100, sellingTotal: 2500 },
  { month: "Dec", buyingTotal: 2200, sellingTotal: 2600 },
];

const chartConfig = {
  desktop: {
    label: "Buying Total",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Selling Total",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BuyingSellingMetrics() {
  return (
    <Card className="col-span-full md:col-span-6">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>Compra e venda anual</CardTitle>
            <CardDescription>
              Janeiro - Dezembro {new Date().getFullYear()}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={response}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                dataKey="sellingTotal"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="buyingTotal"
                name="Compra total "
                fill="var(--color-desktop)"
                radius={4}
              />
              <Bar
                dataKey="sellingTotal"
                name="Venda total "
                fill="var(--color-mobile)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  );
}
