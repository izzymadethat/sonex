import NotificationCard from "@/components/informational/NotificationCard/NotificationCard";
import { Button } from "@/components/ui/button";
const notification = {
  title: "New message from John Doe",
  message:
    "Hey, I just wanted to let you know that you have a new message from John Doe.",
  author: "The Sonex Team",
  date: "12/12/2024"
};
const Notifications = () => {
  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">Notifications</h1>
      <div className="max-w-xl mx-auto space-y-4 overflow-y-scroll max-h-[calc(100vh-320px)]">
        <NotificationCard notification={notification} />
        <NotificationCard notification={notification} />
        <NotificationCard notification={notification} />
        <NotificationCard notification={notification} />
        <NotificationCard notification={notification} />
        <NotificationCard notification={notification} />
        <NotificationCard notification={notification} />
        <NotificationCard notification={notification} />
      </div>
      <div className="flex justify-end mt-8">
        <Button variant="outline">Mark all as read</Button>
      </div>
    </div>
  );
};
export default Notifications;
