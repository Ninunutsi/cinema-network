import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ProfileForm } from "@/features/profile/components/ProfileForm";
import TicketsList from "./components/TicketsList";
import { useUrlState, param } from "@/hooks/useUrlState";

const profileUrlSchema = {
  tab: param.string("tab"),
};

type ProfileTab = "personal-information" | "my-tickets";

const DEFAULT_TAB: ProfileTab = "personal-information";

const isProfileTab = (value: string | undefined): value is ProfileTab =>
  value === "personal-information" || value === "my-tickets";

const ProfilePage = () => {
  const { values, set } = useUrlState(profileUrlSchema, {
    resetKeys: [],
  });

  const activeTab = isProfileTab(values.tab) ? values.tab : DEFAULT_TAB;

  const handleTabChange = (value: string) => {
    if (isProfileTab(value)) {
      set("tab", value === DEFAULT_TAB ? undefined : value);
    }
  };

  return (
    <main className="w-full min-w-0 px-4 py-8 sm:px-8 lg:px-15">
      <h1 className="mb-7 font-sans text-2xl font-extrabold leading-none tracking-normal text-white">
        My Profile
      </h1>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
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
