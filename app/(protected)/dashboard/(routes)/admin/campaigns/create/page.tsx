"use client";

import * as z from "zod";
import axios from "axios";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    }
  })

  const {isSubmitting, isValid} = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values)
      const response = await axios.post("/api/campaigns", values);
      router.push(`/dashboard/admin/campaigns/${response.data.id}`);
      toast.success("Campaign created");
    } catch {
      toast.error("Someting went wrong")
    }
  }

  return ( 
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">
          Name your campaign
        </h1>
        <p className="text-sm text-slate-600">what would you like to name your campaign? Don&apos;t worry, you can change this later.</p>
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8">
              <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>
                      Campaign title
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Charity for education"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
                />
                <div className="flex items-center gap-x-2">
                  <Link href="/">
                    <Button
                      type="button"
                      variant="ghost"
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                  >
                    Continue
                  </Button>
                </div>
          </form>
        </Form>
      </div>
    </div>
   );
}
 
export default CreatePage;