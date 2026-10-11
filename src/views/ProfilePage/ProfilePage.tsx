import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { ProfileForm } from "../../features/profile/components/ProfileForm";
import TicketsList from "./components/TicketsList";

const ProfilePage = () => {
  return (
    <main className="w-full min-w-0 px-4 py-8 sm:px-8 lg:px-15">
      <h1 className="mb-7 font-sans text-2xl font-extrabold leading-none tracking-normal text-white">
        My Profile
      </h1>

      <Tabs
        defaultValue="personal-information"
        className="w-full min-w-0 gap-6"
      >
        <TabsList
          variant="line"
          className="h-auto w-full justify-start gap-8 rounded-none border-b border-background-tint px-0"
        >
          <TabsTrigger
            value="personal-information"
            className="h-auto flex-none cursor-pointer rounded-none px-0 pb-3.5 text-sm font-semibold after:rounded-t-full after:bg-danger"
          >
            Personal Information
          </TabsTrigger>

          <TabsTrigger
            value="my-tickets"
            className="h-auto flex-none cursor-pointer rounded-none px-0 pb-3.5 text-sm font-semibold after:rounded-t-full after:bg-danger"
          >
            My Tickets
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal-information" className="w-full min-w-0">
          <ProfileForm />
        </TabsContent>

        <TabsContent value="my-tickets" className="w-full min-w-0">
          <TicketsList />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default ProfilePage;
