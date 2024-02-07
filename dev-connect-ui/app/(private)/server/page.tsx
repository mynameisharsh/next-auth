import { auth } from "@/auth";
import UserDetails from "../_components/UserDetails";

const Server = async () => {
  const session = await auth();

  return <UserDetails label="Server Component" user={session?.user} />;
};

export default Server;
