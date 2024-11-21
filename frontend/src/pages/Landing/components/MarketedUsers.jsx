import { users } from "@/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MarketedUsers = () => {
  return <Tabs defaultValue="engineer">
    <TabsList className="bg-[#212121]">
      {users.map((user) => (
        <TabsTrigger
          key={user.id}
          value={user.id}
          className="text-background"
        >
          {user.tabTitle}
        </TabsTrigger>
      ))}
    </TabsList>
    {
      users.map((user) => (
        <TabsContent key={user.id} value={user.id}>
          <div className="flex gap-4 mt-12">
            <div>
              <h2 className="mb-4 text-2xl font-bold">{user.tabTitle}</h2>
              <p>{user.content}</p>
            </div>
            <div>
              <img src={user.images[0]} alt={user.tabTitle} />
            </div>
          </div>
        </TabsContent>
      ))
    }
  </Tabs >;
};

export default MarketedUsers;
