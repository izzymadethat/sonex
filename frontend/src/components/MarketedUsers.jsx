import { useState } from "react";
import { users } from "../constants";
import { Button, Tab, Tabs, Image } from "@nextui-org/react";

const MarketedUsers = () => {
  const [selected, setSelected] = useState("engineer");

  return (
    <Tabs items={users} variant="bordered" isVertical>
      {(usr) => (
        <Tab key={usr.id} title={usr.tabTitle}>
          <div className="ml-10">
            <h2 className="text-3xl font-extrabold">
              Built for{" "}
              <span className="text-primary underline">{usr.header}</span>
            </h2>
            <div className="grid grid-cols-5 gap-4 place-items-center">
              <div className="col-span-2 space-y-4 max-w-lg">
                <h4 className="text-3xl">{usr.contentTitle}</h4>
                <p>{usr.content}</p>
                <Button disabled fullWidth>
                  Sign up to use Sonex
                </Button>
              </div>
              <div className="col-span-3">
                {usr.images.map((imgLink) => (
                  <Image
                    isZoomed
                    width
                    src={imgLink}
                    alt={`Sonex works for ${usr.header}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Tab>
      )}
    </Tabs>
  );
};

export default MarketedUsers;
