import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const Settings = async () => {
  const session = await auth();
  return (
    <>
      <p>Session is: {JSON.stringify(session)}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Log out</Button>
      </form>
    </>
  );
};

export default Settings;
