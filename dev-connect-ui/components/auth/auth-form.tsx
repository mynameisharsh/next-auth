"use client";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWrapper from "./card-wrapper";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { login } from "@/actions/login";
import { useState } from "react";
import FormActionError from "../form-action-message";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const FormInput = () => {
  const searchParam = useSearchParams();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>(
    searchParam.get("error") === "OAuthAccountNotLinked"
      ? "Another account already exists with the same e-mail address"
      : ""
  );
  const [twoFactorAuthentication, setTwoFactorAuthentication] =
    useState<boolean>(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    login(values).then(
      (
        response:
          | {
              error?: string;
              success?: string;
              twoFactorAuthentication?: boolean;
            }
          | undefined
      ) => {
        if (response?.error) {
          form.reset();
          setError(response?.error);
        }
        if (response?.success) {
          form.reset();
          setSuccess(response?.success);
        }
        if (response?.twoFactorAuthentication) {
          setTwoFactorAuthentication(
            response?.twoFactorAuthentication ?? false
          );
        }
      }
    );
  };

  return (
    <CardWrapper
      title="Login"
      social={true}
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account?"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            {!twoFactorAuthentication && (
              <>
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="john.doe@gmail.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="******"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {twoFactorAuthentication && (
              <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="123456" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button variant={"link"} asChild className="px-0">
              <Link href={"/auth/forgot-password"}>Forgot Password?</Link>
            </Button>
            <FormActionError message={error ?? success} isError={!!error} />
            <Button type="submit" className="w-full">
              {twoFactorAuthentication ? "Confirm" : "Login"}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default FormInput;
