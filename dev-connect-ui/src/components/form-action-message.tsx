import { cn } from "@/lib/utils";
import { CheckCheckIcon, CheckCircleIcon } from "lucide-react";
import { BsExclamationTriangle } from "react-icons/bs";

interface FormActionMessageProps {
  message?: string;
  isError: boolean;
}

const FormActionError = ({ message, isError }: FormActionMessageProps) => {
  if (!message) return null;

  return (
    <div
      className={cn(
        "flex p-3 gap-2 rounded-md text-sm items-center",
        { "bg-destructive/15 text-destructive": isError },
        { "bg-emerald-500/15 text-emerald-500": !isError }
      )}
    >
      {isError ? (
        <BsExclamationTriangle className="h-4 w-4" />
      ) : (
        <CheckCircleIcon className="h-4 w-4" />
      )}{" "}
      {message}
    </div>
  );
};

export default FormActionError;
