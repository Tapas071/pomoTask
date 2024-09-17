"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
// import { useForm, FormProvider } from "react-hook-form";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  status: z.boolean(),
});

export function EditForm() {
    
    const router = useRouter();
    const form = useForm({
      resolver: zodResolver(formSchema),
    });

        const onSubmit = async (data: any) => {
          //  data.status = data.status === "true";
          // console.log(data);
          // router.refresh();
        //   onSubmitSuccess();
        };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter Title here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter Description here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                {/* <Input placeholder="shadcn" {...field} /> */}
                <select {...field} className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="true">Done</option>
                  <option value="false">Not Done</option>
                </select>
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
