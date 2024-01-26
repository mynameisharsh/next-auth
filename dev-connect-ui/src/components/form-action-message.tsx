import { BsExclamationTriangle } from "react-icons/bs";

interface FormActionMessageProps {
  message?: string;
}

const FormError = ({ message }: FormActionMessageProps) => {
  if (!message) return null;

  return (
    <div className="flex bg-destructive/15 text-destructive p-3 gap-2 rounded-md text-sm items-center">
      <BsExclamationTriangle className="h-4 w-4" /> {message}
    </div>
  );
};

export default FormError;
