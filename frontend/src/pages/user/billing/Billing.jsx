import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2 } from "lucide-react";
import { pricingPlans } from "@/constants";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const Billing = () => {
  const pricing = pricingPlans[0];

  const [storageIncrementSize, setStorageIncrementSize] = useState(1);
  const [pricePer256GB, setPricePer256GB] = useState(7);
  const [totalStorage, setTotalStorage] = useState(256);

  const updateTotalStorage = (value) => {
    if (value <= 0) value = 1;

    setStorageIncrementSize(value);
    setTotalStorage(() => value * 256);
    setPricePer256GB(() => value * 7);
  };
  const createSubscription = (e) => {
    e.preventDefault();
    console.log("Creating subscription");
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-4 mb-4">
        <h2 className="text-4xl font-extrabold">Isaiah Vickers</h2>
        <Badge className="flex gap-1 text-xs font-semibold uppercase rounded-full bg-primary/10 text-primary">
          <CheckCircle2 /> Monthly User
        </Badge>
      </div>
      <div className="mx-auto space-y-4 ">
        <h2 className="my-2 text-lg italic text-center text-muted-foreground">
          Upgrade your account to...
        </h2>
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="monthly">
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>

            {/* Monthly Pricing */}
            <TabsContent value="monthly" className="max-w-lg mx-auto my-16">
              <Card className="text-center border-4 rounded-lg border-primary">
                <CardHeader>
                  <CardTitle>
                    <h4 className="uppercase">{pricing.name} monthly</h4>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Pricing */}
                  <div className="flex flex-col items-center mx-auto w-fit">
                    <h3 className="font-extrabold text-8xl text-primary">
                      ${pricing.plans.monthly.price}
                    </h3>
                    <span className="self-end text-lg font-bold">/ month</span>
                  </div>
                  <p className="my-5 italic text-muted-foreground">
                    Already included: Up to 256GB storage space
                  </p>

                  {/* Features List */}
                  <ul className="space-y-4">
                    {pricing.plans.monthly.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="flex-shrink-0">
                          <CheckCircle2 className="text-primary" size={24} />
                        </div>
                        <p>{feature}</p>
                      </li>
                    ))}
                  </ul>

                  <Separator className="w-3/4 mx-auto my-12" />
                  {/* Monthly Buttons */}
                  <div className="flex flex-col items-center gap-4">
                    {/* Upgrade Monthly Storage Button */}
                    <Dialog>
                      <DialogTrigger>
                        <Button className="text-lg">Need more storage?</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="w-4/5 mx-auto text-4xl font-bold leading-10 text-center">
                            Add Storage to Your Account{" "}
                            <span className="underline text-primary">
                              ANYTIME!
                            </span>
                          </DialogTitle>
                        </DialogHeader>
                        <p className="italic text-center text-muted-foreground">
                          Add extra storage to your account for only $7/mo per
                          256GB. If you are in the middle of your current plan,
                          you will be charged the prorated amount for the month.
                        </p>

                        <div>
                          <div className="flex items-center justify-between gap-8 mx-8 mt-4 mb-6">
                            <Label className="flex flex-col max-w-xs text-md">
                              <span>Enter Storage Quantity</span>
                              <span>(in increments of 256GB):</span>
                            </Label>
                            <Input
                              type="number"
                              className="text-lg font-extrabold text-center w-28 text-primary"
                              value={storageIncrementSize}
                              onChange={(e) =>
                                updateTotalStorage(e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <div className="flex justify-between mx-8 my-4">
                              <span>Total Storage Size</span>
                              <span className="text-2xl font-bold">
                                {totalStorage}GB
                              </span>
                            </div>
                            <div className="flex justify-between mx-8 my-4">
                              <span>Total Cost</span>
                              <span className="text-2xl font-bold">
                                ${pricePer256GB} extra / mo
                              </span>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="destructive">Cancel</Button>
                          </DialogClose>
                          <Button>
                            Add {totalStorage}GB (${pricePer256GB})
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {/* Monthly Subscription Button */}
                    <Button disabled>Upgrade/Downgrade to Monthly</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Yearly Pricing */}
            <TabsContent value="yearly" className="max-w-lg mx-auto my-16">
              <Card className="text-center border-4 rounded-lg border-primary">
                <CardHeader>
                  <CardTitle>
                    <h4 className="uppercase">{pricing.name} yearly</h4>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Pricing */}
                  <div className="flex flex-col items-center mx-auto w-fit">
                    <h3 className="font-extrabold text-8xl text-primary">
                      ${pricing.plans.yearly.price.toFixed(2)}
                    </h3>
                    <span className="self-end text-lg font-bold">/ month</span>
                  </div>
                  <p className="my-5 italic text-muted-foreground">
                    Already included: Up to 256GB storage space
                  </p>

                  {/* Features List */}
                  <ul className="space-y-4">
                    {pricing.plans.yearly.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="flex-shrink-0">
                          <CheckCircle2 className="text-primary" size={24} />
                        </div>
                        <p>{feature}</p>
                      </li>
                    ))}
                  </ul>

                  <Separator className="w-3/4 mx-auto my-12" />

                  {/* Yearly Buttons */}
                  <div className="flex flex-col items-center gap-4">
                    {/* Upgrade Yearly Storage Button */}
                    <Dialog>
                      <DialogTrigger>
                        <Button className="text-lg">Need more storage?</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="w-4/5 mx-auto text-4xl font-bold leading-10 text-center">
                            Add Storage to Your Account{" "}
                            <span className="underline text-primary">
                              ANYTIME!
                            </span>
                          </DialogTitle>
                        </DialogHeader>
                        <p className="italic text-center text-muted-foreground">
                          Add extra storage to your account for only $7/mo per
                          256GB. If you are in the middle of your current plan,
                          you will be charged the prorated amount for the month.
                        </p>

                        <div>
                          <div className="flex items-center justify-between gap-8 mx-8 mt-4 mb-6">
                            <Label className="flex flex-col max-w-xs text-md">
                              <span>Enter Storage Quantity</span>
                              <span>(in increments of 256GB):</span>
                            </Label>
                            <Input
                              type="number"
                              className="text-lg font-extrabold text-center w-28 text-primary"
                              value={storageIncrementSize}
                              onChange={(e) =>
                                updateTotalStorage(e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <div className="flex justify-between mx-8 my-4">
                              <span>Total Storage Size</span>
                              <span className="text-2xl font-bold">
                                {totalStorage}GB
                              </span>
                            </div>
                            <div className="flex justify-between mx-8 my-4">
                              <span>Total Cost</span>
                              <span className="text-2xl font-bold">
                                ${pricePer256GB} extra / mo
                              </span>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="destructive">Cancel</Button>
                          </DialogClose>
                          <Button>
                            Add {totalStorage}GB (${pricePer256GB})
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {/* Yearly Subscription Button */}
                    <Button disabled>Upgrade/Downgrade to Yearly</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export default Billing;
