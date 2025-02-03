"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import {useState} from "react";
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
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  status: z.string().min(2,{
    message: "status must be at least 2 characters."
  }),
});

interface EditFormProps {

  open: boolean;

  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

}

const EditForm: React.FC<EditFormProps> = ({ open, setOpen }) => {
  const [isDone , setIsDone] = useState("false");
    const router = useRouter();
    const form = useForm({
      resolver: zodResolver(formSchema),
    });
        const onSubmit = async (data: any) => {
            // e.preventDefault();
          //  data.status = data.status === "true";
          // console.log(data);
          // const response = await axios.post("/api/add-todo", data);
          // console.log(response);
        //  router.refresh();
          // onSubmitSuccess();
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
                <select
                  {...field}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  onChange={(e) => {
                    field.onChange(e.target.value); // Update form state
                    setIsDone(e.target.value); // Update local state
                  }}
                >
                  <option value="false">Undone</option>
                  <option value="true">Done</option>
                </select>
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <AlertDialogAction>
          <Button type="submit" onClick={()=>{
            console.log("clicked")
          }}>Submit</Button>
        </AlertDialogAction>
      </form>
    </Form>
  );
}
export default EditForm