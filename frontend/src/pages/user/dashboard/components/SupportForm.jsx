import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const SupportForm = () => {
  /* Contact support..for now TODO: set button to be disabled if no message is entered */

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [messageInput, setMessageInput] = useState("");

  const allInfoEntered = nameInput && emailInput && messageInput;

  return (
    <div className="w-full p-6 border rounded-md shadow-md ">
      <div className="mb-4">
        <h3 className="text-lg font-bold uppercase">Contact Support:</h3>
        <p className="italic">
          Questions? Issues? Want to give feedback? Submit here and we'll
          contact you within 24 hours.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          type="text"
          name="name"
          id="name"
          className="focus:border-primary"
          placeholder="Enter your first name"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <Input
          type="email"
          name="email"
          id="email"
          className="focus:border-primary"
          placeholder="Enter your best email address"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />

        <Textarea
          name="message"
          id="message"
          rows={5}
          className=" focus:border-primary"
          placeholder="Enter your message"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        ></Textarea>
        <Button
          className="w-full p-2 rounded-lg hover:bg-primary hover:text-background text-secondary-foreground bg-secondary"
          onClick={() => alert("Feature coming soon")}
          disabled={!allInfoEntered}
        >
          Submit your message
        </Button>
      </div>
    </div>
  );
};
export default SupportForm;
