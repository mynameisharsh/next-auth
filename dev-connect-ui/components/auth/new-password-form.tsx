"use client";

import * as z from "zod";
import { useSearchParams } from "next/navigation";
import FormActionError from "../form-action-message";
import CardWrapper from "./card-wrapper";
import { useState } from "react";
import { verifyResetPasswordToken } from "@/actions/reset-password";
import { useForm } from "react-hook-form";
import { PasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const NewPasswordForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParam = useSearchParams();

  const token = searchParam.get("token");

  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmitPassword = (values: z.infer<typeof PasswordSchema>) => {
    const validator = PasswordSchema.safeParse(values);
    if (!validator.success) {
      setError("Password is required");
      return;
    }
    const { password } = validator.data;
    verifyResetPasswordToken(password, token).then(
      (response: { error?: string; success?: string } | undefined) => {
        setSuccess(response?.success);
        setError(response?.error);
      }
    );
  };

  return (
    <CardWrapper
      title="Change Password"
      backButtonHref="/auth/login"
      backButtonLabel="Go to Login"
    >
      <div className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitPassword)}
            className="space-y-4"
          >
            <div className="space-y-4">
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="******" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormActionError message={error ?? success} isError={!!error} />
              <Button type="submit" className="w-full">
                Change Password
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </CardWrapper>
  );
};

export default NewPasswordForm;
