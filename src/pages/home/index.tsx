import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DollarSign, Loader2 } from "lucide-react";
import {
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format, subDays } from "date-fns";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { getPopularProducts } from "@/api/products/get-popular-products";

const COLOR_CLASSES = [
  "fill-sky-500",
  "fill-amber-500",
  "fill-violet-500",
  "fill-emerald-500",
  "fill-rose-500",
];

export function Home() {
  const chartData = [
    { date: format(new Date(), "MM/dd/yyyy"), receipt: 213 },
    { date: format(new Date(), "MM/dd/yyyy"), receipt: 32 },
    { date: format(new Date(), "MM/dd/yyyy"), receipt: 113 },
    { date: format(new Date(), "MM/dd/yyyy"), receipt: 80 },
    { date: format(new Date(), "MM/dd/yyyy"), receipt: 15 },
    { date: format(new Date(), "MM/dd/yyyy"), receipt: 58 },
  ];

  const [period, setPeriod] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const { data: popularProducts } = useQuery({
    queryKey: ["popular-products"],
    queryFn: () => getPopularProducts(),
  });

  return (
    <>
      <Helmet title="Home" />
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
        BizEase Home
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">
              Vendas (semana)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-1">
            <>
              {/* <span className="text-2xl font-bold tracking-tight">
                {monthCanceledOrdersAmount.amount.toLocaleString("pt-BR")}
              </span> */}
              <p className="text-xs text-muted-foreground">
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    5%
                  </span>{" "}
                  em relação ao mês passado
                </>
              </p>
            </>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">
              Cancelamentos (semana)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-1">
            <>
              {/* <span className="text-2xl font-bold tracking-tight">
                {monthCanceledOrdersAmount.amount.toLocaleString("pt-BR")}
              </span> */}
              <p className="text-xs text-muted-foreground">
                <>
                  <span className="text-rose-500 dark:text-rose-400">-5%</span>{" "}
                  em relação ao mês passado
                </>
              </p>
            </>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">
              Vendas (mês)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-1">
            <>
              {/* <span className="text-2xl font-bold tracking-tight">
                {monthCanceledOrdersAmount.amount.toLocaleString("pt-BR")}
              </span> */}
              <p className="text-xs text-muted-foreground">
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    5%
                  </span>{" "}
                  em relação ao mês passado
                </>
              </p>
            </>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">
              Cancelamentos (mês)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-1">
            <>
              {/* <span className="text-2xl font-bold tracking-tight">
                {monthCanceledOrdersAmount.amount.toLocaleString("pt-BR")}
              </span> */}
              <p className="text-xs text-muted-foreground">
                <>
                  <span className="text-rose-500 dark:text-rose-400">-5%</span>{" "}
                  em relação ao mês passado
                </>
              </p>
            </>
          </CardContent>
        </Card>
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
            {chartData ? (
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={chartData} style={{ fontSize: 12 }}>
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
            {popularProducts && popularProducts.data.length > 0 ? (
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
                    {popularProducts.data.map((_: unknown, index: number) => {
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
