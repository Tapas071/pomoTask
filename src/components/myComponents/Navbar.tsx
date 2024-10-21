import React from 'react'
// import { Button } from '../ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
// import { EditForm } from './EditForm';
import dynamic from "next/dynamic";
import Settings from './Settings';
import Image from 'next/image';
import pomoClock from "@/assets/images/pomoClock.png";


const EditForm = dynamic(
  () => import("./EditForm").then((mod) => mod.EditForm),
  { ssr: false }
);

const Button = dynamic(() => import("../ui/button").then((mod) => mod.Button), {
  ssr: false,
});

const dialog =()=>{ 
  <>
    <AlertDialog>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
}
const components = {
  dialog
};


const Navbar = () => {
    const ComponentToRender = components.dialog;
  return (
    <>
      <nav className="h-4 m-5 flex justify-around">
        <Image src={pomoClock} alt="logo" width={100} />

        <div className="">
          <AlertDialog>
            <AlertDialogTrigger>
              <Button className="bg-green-500 justify-end">Add Todo</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                {/* <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription> */}
                <EditForm />
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="">
          <Settings />
        </div>
      </nav>
    </>
  );
}

export default Navbar