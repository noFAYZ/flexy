"use client";

import { Button, Button as Button2 } from "@nextui-org/button";
import { Avatar } from "@nextui-org/react";
import {useLogin, usePrivy} from '@privy-io/react-auth';
import { User } from "lucide-react";


export default function Home() {
  const {ready, authenticated, login} = usePrivy();
  const disableLogin = !ready || (ready && authenticated);

 
  return (
    <div className="space-x-4 p-4">

      <Button2 disabled={disableLogin} onClick={()=>{
        login()
        }}>Login</Button2>

        <section>
          Test paragraph for font lufga to check if it works or not.
         
        </section>
    </div>
  );
}
