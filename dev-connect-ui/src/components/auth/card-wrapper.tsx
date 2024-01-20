import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import BackButton from "./back-button";
import Social from "./social";

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const CardWrapper = ({ children, title }: CardProps) => {
  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader>
        <h1 className="text-4xl text-center">{title}</h1>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Social />
      </CardFooter>
      <CardFooter>
        <BackButton />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
