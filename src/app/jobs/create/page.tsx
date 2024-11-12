"use client"
import React from 'react'
import { useOrbisStore } from "@/app/lib/orbis";
import { Button } from '@nextui-org/button';


const Page = () => {
    const { createPost, loading } = useOrbisStore();
    const handleCreateJob = async () => {
            try {
                const post = await createPost({
                    title: "Senior React Developer",
                    body: "We're looking for...",
                    type: "job",
                    tags: ["react", "typescript"],
                    metadata: {
                        budget: 5000,
                        duration: "3 months"
                    }
                });
                console.log("Job created:", post);
            } catch (error) {
                console.error("Error creating job:", error);
            }
        };


  return (
    <>

    <div className='flex justify-center flex-col'>
         <Button 
    onClick={handleCreateJob}
    disabled={loading}
>
    Create Job Post
</Button>


    </div>


   </>
  )
}

export default Page


