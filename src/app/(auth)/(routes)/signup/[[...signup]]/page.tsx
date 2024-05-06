"use client"
import React from 'react'
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa6";
import Link from 'next/link'
import axios from 'axios'; 
import { useRouter } from 'next/navigation'

const signUpSchema = z.object({
    fullName: z.string().min(2, "Name Should have atleast 2 characters.").max(50, "Name should not exceed 50 characters.").refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value), 'Name should contain only alphabets.'),
    email: z.string().email("Email must be valid."),
    password: z.string().min(6, "Password Should have atleast 6 characters.")
});

const Page = () => {
    
    const router = useRouter();

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
          fullName: "",
          email: "",
          password: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
        try {
            const response = await axios.post('http://localhost:3001/api/user', values);

            if (response.status === 201) {
                alert(response.data.message);
                router.push('/signin');
            } else {
                console.error('Failed to create user:', response.data.message);
            }
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };

  return (
    <>
        <div className="signUpWrapper">
            <div className="formWrapper">
                <div className="left ">
                    <h3 className="title my-2">Welcome Back!</h3>
                    <p>You can sign in to access with your existing profile.</p>
                    <Link href={"/signin"}>
                        <Button className='border-zinc-850 text-zinc-300 hover:border-zinc-200 hover:text-zinc-100 transition-colors border  px-8'>Sign In</Button>
                    </Link>
                </div>
                <div className="right">
                    <h3 className='text-center text-2xl font-semibold'>Register Here</h3>
                    <div className="socialSignUpOptions">
                        <Button variant={"outline"} className='socialFormBtn'><FaGoogle className="h-5 w-5"/></Button>
                        <Button variant={"outline"} className='socialFormBtn'><FaFacebook className="h-5 w-5"/></Button>
                        <Button variant={"outline"} className='socialFormBtn'><FaGithub className="h-5 w-5"/></Button>
                    </div>
                    <p className='text-center'>or use this option</p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem className='space-y-0 mb-2'>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Lorem" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className='space-y-0 mb-2'>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="admin@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className='space-y-0 mb-2'>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="********" type='password' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className='w-full'>Submit</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Page