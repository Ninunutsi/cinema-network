import { useCurrentUserQuery } from "../api/queries/auth-queries";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { ProfileForm } from "../features/profile/components/ProfileForm";

const ProfilePage = () => {
  const userRes = useCurrentUserQuery();
  const user = userRes.data;
  return (
    <main className="px-15">
      <section className="flex flex-col gap-7 border-b border-background-tint h-22.5 justify-between">
        <h1 className="font-sans text-2xl font-extrabold leading-none tracking-normal text-white">
          My Profile
        </h1>
        <Tabs defaultValue="personal-information" className="gap-9 ">
          <TabsList variant="line" className="px-0 gap-8">
            <TabsTrigger
              className="pb-3.5 px-0 cursor-pointer after:bg-danger  after:rounded-t-full text-sm font-semibold"
              value="personal-information"
            >
              Personal Information
            </TabsTrigger>
            <TabsTrigger
              className="pb-3.5 px-0 cursor-pointer after:bg-danger  after:rounded-t-full text-sm font-semibold"
              value="my-tickets"
            >
              My Tickets
            </TabsTrigger>
          </TabsList>
          <TabsContent value="personal-information">
            <ProfileForm />
          </TabsContent>
          <TabsContent value="my-tickets">meore</TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default ProfilePage;
