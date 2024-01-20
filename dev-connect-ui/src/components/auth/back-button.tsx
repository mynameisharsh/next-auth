import Link from "next/link";
import { Button } from "../ui/button";

const BackButton = () => {
  return (
    <div className="d-flex w-full text-center">
      <Button variant="link" asChild>
        <Link href="/auth/register">Dont have an account?</Link>
      </Button>
    </div>
  );
};

export default BackButton;
