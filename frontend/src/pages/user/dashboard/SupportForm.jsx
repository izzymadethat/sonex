import { Button } from "@/components/ui/button";
import { useState } from "react";

const SupportForm = () => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  return (
    <div className="w-full p-6 border rounded-md shadow-md ">
      <div className="mb-4">
        <h3 className="text-lg font-bold uppercase">Contact Support:</h3>
        <p className="italic">
          Questions? Issues? Want to give feedback? Submit here and we'll
          contact you within 24 hours.
        </p>
      </div>

      <div className="space-y-4 text-background">
        <input
          type="text"
          name="name"
          id="name"
          className="w-full p-2 border rounded-md border-primary"
          placeholder="Enter your first name"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <input
          type="email"
          name="email"
          id="email"
          className="w-full p-2 border rounded-md border-primary"
          placeholder="Enter your best email address"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />

        <textarea
          name="message"
          id="message"
          rows={5}
          className="w-full p-2 border rounded-md border-primary"
          placeholder="Enter your message"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        ></textarea>
        <Button
          className="w-full p-2 rounded-lg hover:bg-primary hover:text-background text-secondary-foreground bg-secondary"
          onClick={() => alert("Feature coming soon")}
        >
          Submit your message
        </Button>
      </div>
    </div>
  );
};
export default SupportForm;
