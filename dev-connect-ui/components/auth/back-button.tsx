import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
  backButtonHref: string;
  backButtonLabel: string;
}

const BackButton = ({ backButtonHref, backButtonLabel }: BackButtonProps) => {
  return (
    <div className="d-flex w-full text-center">
      <Button variant="link" asChild>
        <Link href={backButtonHref}>{backButtonLabel}</Link>
      </Button>
    </div>
  );
};

export default BackButton;
