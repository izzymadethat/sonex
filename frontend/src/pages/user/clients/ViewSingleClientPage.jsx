import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SquarePen } from "lucide-react";
import { useState } from "react";

const ViewSingleClientPage = () => {
  const params = useParams();
  const client = useSelector((state) =>
    state.clients.find((c) => String(c.id) === params.clientId)
  );

  const [firstNameInput, setFirstNameInput] = useState(client.name);
  const [emailInput, setEmailInput] = useState(client.email);
  const [isInEditMode, setIsInEditMode] = useState(false);

  const handleEditMode = (e) => {
    if (isInEditMode) {
      setFirstNameInput(client.name);
      setEmailInput(client.email);
    }
    setIsInEditMode(!isInEditMode);
  };

  const handleFirstNameInputChange = (e) => {
    if (!isInEditMode && !e.target.value) {
      setFirstNameInput(client.name);
    } else {
      setFirstNameInput(e.target.value);
    }
  };

  const handleEmailInputChange = (e) => {
    if (!isInEditMode && !e.target.value) {
      setEmailInput(client.email);
    } else {
      setEmailInput(e.target.value);
    }
  };

  const handleSaveClientInfo = (e) => {
    e.preventDefault();

    if (!firstNameInput) {
      alert("Please enter a first name");
      return;
    }

    if (!emailInput) {
      alert("Please enter an email");
      return;
    }
  };

  return (
    <section className="m-8 space-y-8">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">{client.name}</h1>
      </div>

      {/* Client Information Card */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Client Information</h2>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col w-full gap-4"
            onSubmit={handleSaveClientInfo}
          >
            <div className="flex flex-col w-full gap-2 lg:gap-4 lg:flex-row">
              <div className="flex flex-col w-full gap-4">
                <Label>First name:</Label>
                <Input
                  value={firstNameInput}
                  onChange={handleFirstNameInputChange}
                  disabled={!isInEditMode}
                />
              </div>
              <div className="flex flex-col w-full gap-4">
                <Label>Email:</Label>
                <Input
                  value={emailInput}
                  onChange={handleEmailInputChange}
                  disabled={!isInEditMode}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant={isInEditMode ? "destructive" : ""}
                onClick={handleEditMode}
              >
                {isInEditMode ? (
                  "Cancel"
                ) : (
                  <>
                    <SquarePen /> Edit
                  </>
                )}
              </Button>
              <Button type="submit" disabled={!isInEditMode}>
                Save Changes
              </Button>
            </div>
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
            <Button variant="destructive" color="red" disabled>
              Delete This Client
            </Button>
          </div>
        </CardHeader>
      </Card>
    </section>
  );
};

export default ViewSingleClientPage;
