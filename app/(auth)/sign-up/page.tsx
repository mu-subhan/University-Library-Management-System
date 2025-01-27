"use client"

import React from 'react'
import AuthForm from "@/components/AuthForm"
import { signUpSchema } from '@/lib/validation'
import { signUp } from '@/lib/action/auth'

const page = () => (
  <AuthForm 
  type="SIGN_UP"
  schema={signUpSchema}
  defaultValues={{
    email:"",
    password:"",
    fullName:"",
    universityId:0,
    universityCard:"",

  }}
  onSubmit={signUp}
  />
)

export default page
