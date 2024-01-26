import { auth } from "@/auth";

const Settings = async () => {
  const session = await auth();
  return (
    <p>Session is: {JSON.stringify(session)}</p>
  )
}

export default Settings;