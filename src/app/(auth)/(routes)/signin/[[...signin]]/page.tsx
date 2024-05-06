"use client"
import React, { useState } from 'react'
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
import { useRouter } from 'next/navigation';

const signInSchema = z.object({
    email: z.string().email("Email must be valid."),
    password: z.string().min(6, "Password Should have atleast 6 characters."),
})

const Page = () => {
    
    const router = useRouter();

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
          email: "",
          password: "",
        },
    })

    const [isLoading, setIsLoading] = useState(false);
   
    const onSubmit = async (values: any): Promise<void> => {
      try {
        setIsLoading(true);
  
       
        const user = await loginUser(values);
        localStorage.setItem('userToken', user.data.token);
        router.push('/'); 
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
  
    const loginUser = async ( formData: any ): Promise<any> => {
      try {
        const response = await axios.post(`http://localhost:3001/api/user/login`, formData, { });
  
        if (response.status === 200) {
          // Handle successful login
          return response.data;
        } else {
          throw new Error('Login failed');
        }
      } catch (error) {
        throw new Error('Login failed');
      }
    }

  return (
    <>
        <div className="signUpWrapper">
            <div className="formWrapper">
                <div className="left">
                      <h3 className="title">Welcome to the Family</h3>
                      <p>Let's make it Happen Together!</p>
                      <p>Enter your personal details and start journey with us</p>                     
                    <Link href={"/signup"}>
                        <Button className='border-zinc-500 text-zinc-300 hover:border-zinc-200 hover:text-zinc-100 transition-colors border rounded-full px-8'>Sign Up</Button>
                    </Link>
                </div>
                <div className="right">
                    <h3 className='text-center text-2xl font-semibold'>Sign In Here</h3>
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