"use client";

import { useSearchParams } from "next/navigation";
import FormActionError from "../form-action-message";
import CardWrapper from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { verifyAccount } from "@/actions/verify-account";

const VerifyAccountForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParam = useSearchParams();

  const token = searchParam.get("token");

  const onSubmit = useCallback(() => {
    verifyAccount(token).then((res) => {
      setError(res?.error);
      setSuccess(res?.success);
    });
  }, []);

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <CardWrapper
      title="Verify Account"
      backButtonHref="/auth/login"
      backButtonLabel="Go to Login"
    >
      <div className="text-center">
        {!(error || success) && <BeatLoader />}
        <FormActionError isError={!!error} message={error ?? success} />
      </div>
    </CardWrapper>
  );
};

export default VerifyAccountForm;
