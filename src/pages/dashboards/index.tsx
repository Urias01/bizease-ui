import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { BuyingSellingMetrics } from "./components/buying-selling-metrics";
import { InputLoss } from "./components/input-loss";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { subDays  } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import {
  Label,
  ResponsiveContainer,
  BarChart,
  LineChart,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
  Pie,
  Cell,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getPopularProducts } from "@/api/products/get-popular-products";
import { getRevenueByPeriod } from "@/api/sales-order-items/get-revenue-by-period";

const COLOR_CLASSES = [
  "fill-sky-500",
  "fill-amber-500",
  "fill-violet-500",
  "fill-emerald-500",
  "fill-rose-500",
];

export function Dashboards() {
  const { data: popularProducts } = useQuery({
    queryKey: ["popular-products"],
    queryFn: () => getPopularProducts(),
  });

  const [period, setPeriod] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const { data: revenue } = useQuery({
    queryKey: ["revenue", period],
    queryFn: () => getRevenueByPeriod(period?.from!, period?.to!),
    enabled: !!period,
  });

  return (
    <>
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
        Dashboard
      </h1>
      <section className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-9 gap-4">
          <InputLoss />

          <BuyingSellingMetrics />
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-9 gap-4">
        <Card className="col-span-full md:col-span-6">
          <CardHeader className="flex-row items-center justify-between pb-8">
            <div className="space-y-1">
              <CardTitle className="text-base font-medium">
                Receita no período
              </CardTitle>
              <CardDescription>Receira diária no período</CardDescription>
            </div>

            <div className="flex items-center gap-3">
              <Label>Período</Label>
              <DateRangePicker date={period} onDateChange={setPeriod} />
            </div>
          </CardHeader>
          <CardContent>
            {revenue ? (
              <ResponsiveContainer width="100%" height={240}>
                {revenue && Array.isArray(revenue) ? (
                  <LineChart data={revenue} style={{ fontSize: 12 }}>
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      dy={16}
                    />
                    <YAxis
                      stroke="#888"
                      axisLine={false}
                      width={80}
                      tickLine={false}
                      tickFormatter={(value: number) =>
                        value.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })
                      }
                    />
                    <CartesianGrid vertical={false} className="stroke-muted" />
                    <Line
                      type="linear"
                      strokeWidth={2}
                      dataKey="receipt"
                      stroke={"#aa2341"}
                    />
                    <Tooltip />
                  </LineChart>
                ) : (
                  <div className="text-center p-5 text-gray-600 dark:text-gray-400 text-md">
                    Não há dados para exibir no momento.
                  </div>
                )}
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[240px] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-full md:col-span-3">
          <CardHeader className="pb-8">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">
                Produtos populares
              </CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {popularProducts && Array.isArray(popularProducts.data) ? (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart style={{ fontSize: 12 }}>
                  <Pie
                    data={popularProducts.data}
                    dataKey="amount"
                    nameKey="product"
                    cx="50%"
                    cy="50%"
                    outerRadius={86}
                    innerRadius={64}
                    strokeWidth={8}
                    labelLine={false}
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      value,
                      index,
                    }) => {
                      const RADIAN = Math.PI / 180;
                      const radius =
                        12 + innerRadius + (outerRadius - innerRadius);
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);

                      return (
                        <text
                          x={x}
                          y={y}
                          className="fill-muted-foreground text-xs"
                          textAnchor={x > cx ? "start" : "end"}
                          dominantBaseline="central"
                        >
                          {popularProducts.data[index].product.length > 12
                            ? popularProducts.data[index].product
                                .substring(0, 12)
                                .concat("...")
                            : popularProducts.data[index].product}{" "}
                          ({value})
                        </text>
                      );
                    }}
                  >
                    {popularProducts.data.map((_, index) => {
                      return (
                        <Cell
                          key={`cell-${index}`}
                          className={`${COLOR_CLASSES[index]} stroke-background hover:opacity-80`}
                        />
                      );
                    })}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[240px] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
