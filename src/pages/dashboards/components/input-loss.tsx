import {
  Card,
  CardContent,
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
import React from "react";
import { Label, PieChart, Pie, Cell } from "recharts";

const response = [
  { product: "chrome", quantity: 275, priceTotal: 1000 },
  { product: "safari", quantity: 200, priceTotal: 1000 },
  { product: "firefox", quantity: 287, priceTotal: 1000 },
  { product: "edge", quantity: 173, priceTotal: 1000 },
  { product: "other", quantity: 190, priceTotal: 1000 },
];

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const chartConfig = {
  quantity: {
    label: "Quantidade",
  },
  chrome: {
    label: "Product 1",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Product 2",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Product 3",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Product 4",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Product 5",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function InputLoss() {
  const totalVisitors = React.useMemo(() => {
    return response.reduce((acc, curr) => acc + curr.quantity, 0);
  }, []);

  return (
    <Card className="col-span-full md:col-span-3">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>Perca de insumos</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={response}
              dataKey="quantity"
              nameKey="product"
              innerRadius={60}
              strokeWidth={5}
            >
              {response.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Produtos
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
