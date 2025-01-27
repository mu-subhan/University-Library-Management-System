"use server"

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";


export const signInWithCredentials = async (params: Pick<AuthCredentials, "email" | "password">) => {
    const { email, password } = params;
    try {
        const result = await signIn("credentials", { email, password, redirect: false });
        if (result?.error) {
            return { success: false, error: result.error }; // return the error if signIn fails
        }
        return { success: true }; // sign-in success
    } catch (error) {
        console.log(error, "Signin error");
        return { success: false, error: "Signin Error" };
    }
}




export const signUp = async (params: AuthCredentials) => {
    const { fullName, email, universityId, universityCard, password } = params;

    // Check if the user already exists
    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    if (existingUser.length > 0) {
        return { success: false, error: "User already exists" };
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    try {
        // Insert new user into the database
        await db.insert(users).values({
            fullName,
            email,
            universityCard,
            universityId,
            password: hashedPassword,
        });

        // Return success message for sign-up
        return { success: true };
    } catch (error) {
        console.log(error, "Signup error");
        return { success: false, error: "Signup Error" };
    }
}
