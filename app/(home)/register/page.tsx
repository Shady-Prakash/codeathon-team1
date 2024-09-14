"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DonorFormValues {
  companyName: string;
  companyAddress: string;
  contactPersonName: string;
  contactPersonEmail: string;
}

export default function DonorRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DonorFormValues>({
    defaultValues: {
      companyName: "",
      companyAddress: "",
      contactPersonName: "",
      contactPersonEmail: "",
    },
  });

  const onSubmit: SubmitHandler<DonorFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/donor-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      const result = await response.json();
      if (response.ok) {
        alert("Thank you! The Admin will verify your registration shortly.");
        form.reset();
        console.log("Form submitted:", result);
      } else if (response.status === 400) {
        alert(
          "The company is either already registered or pending verification."
        );
      }
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Register New Donor Company</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="companyName"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This is the company’s legal name.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyAddress"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPersonName"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Person Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPersonEmail"
            rules={{
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Person Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="success"
            disabled={isSubmitting}
            className="w-full mt-4"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
