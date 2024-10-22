import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React from "react";

const ViewSingleClientPage = () => {
  return (
    <section className="m-8 space-y-8">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">Client Name Here</h1>
      </div>

      {/* Client Information Card */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Client Information</h2>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col w-full gap-4">
            <div className="flex flex-col w-full gap-2 lg:gap-4 lg:flex-row">
              <div className="flex flex-col w-full gap-4">
                <Label>First name:</Label>
                <Input placeholder="First Name" />
              </div>
              <div className="flex flex-col w-full gap-4">
                <Label>Email:</Label>
                <Input placeholder="Email" />
              </div>
            </div>
            <Button disabled>Save Changes</Button>
          </form>
        </CardContent>
      </Card>

      {/* Client Projects Card */}
      <Card>
        <CardHeader>
          {" "}
          <h2 className="text-xl font-bold">
            Projects That Include This Client
          </h2>{" "}
        </CardHeader>
        <CardContent>
          <p>No projects found. Will update soon</p>
        </CardContent>
      </Card>

      {/* Danger Zone Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-red-500">Danger Zone</h3>
            <Button variant="destructive" color="red">
              Delete This Client
            </Button>
          </div>
        </CardHeader>
      </Card>
    </section>
  );
};

export default ViewSingleClientPage;
