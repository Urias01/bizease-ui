import { getAnnualBuyingAndSelling } from "@/api/sales-order-items/get-annual-buying-and-selling";
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
import { useQuery } from "@tanstack/react-query";
import {
  CartesianGrid,
  XAxis,
  Bar,
  BarChart,
  ResponsiveContainer,
  YAxis,
} from "recharts";

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
  const { data: anualRevenue } = useQuery({
    queryKey: ["anual-revenue"],
    queryFn: () => getAnnualBuyingAndSelling(),
  });

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
            {anualRevenue && Array.isArray(anualRevenue) ? (
              <BarChart accessibilityLayer data={anualRevenue}>
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
            ) : (
              <div className="text-center p-5 text-gray-600 dark:text-gray-400 text-md">
                Não há dados para exibir no momento.
              </div>
            )}
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
