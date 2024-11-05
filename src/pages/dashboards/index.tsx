import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DownloadIcon } from "lucide-react";
import { BuyingSellingMetrics } from "./components/buying-selling-metrics";
import { InputLoss } from "./components/input-loss";

export function Dashboards() {
  return (
    <>
      <h1>Dashboard</h1>
      <section className="space-y-4">
        <div className="flex gap-4 w-full">
          <InputLoss />

          <BuyingSellingMetrics />
        </div>

        <Card>
          <CardHeader className="flex flex-row justify-between align-middle">
            <h2>Dashboard 3</h2>
            <Button className="space-x-2 w-52">
              <p>Exportar</p> <DownloadIcon className="h-4 w-4" />{" "}
            </Button>
          </CardHeader>
          <CardContent>
            <h3>Dashboard Graph</h3>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
