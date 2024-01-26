import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import BackButton from "./back-button";
import Social from "./social";

interface CardProps {
  title: string;
  children: React.ReactNode;
  social?: boolean;
  backButtonHref: string;
  backButtonLabel: string;
}

const CardWrapper = ({
  children,
  title,
  social,
  backButtonHref,
  backButtonLabel,
}: CardProps) => {
  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader>
        <h1 className="text-4xl text-center">{title}</h1>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {social && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          backButtonHref={backButtonHref}
          backButtonLabel={backButtonLabel}
        />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
