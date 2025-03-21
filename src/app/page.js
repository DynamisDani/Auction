"use client";
import  supabase  from "./Supabase/config.js";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs"; // Import Clerk hook

const SignInHandler = () => {
  const { user, isSignedIn } = useUser(); // Get logged-in user details

  useEffect(() => {
    if (!isSignedIn || !user) return; // Ensure user is signed in

    const insertUserData = async () => {
      try {
        const email = user.primaryEmailAddress?.emailAddress || "";

        // Insert user data into Supabase
        const { error } = await supabase.from("users").upsert([
          {
            user_id: user.id,
            email: email,
            role: "authenticated",
          },
        ]);

        if (error) throw error;
        console.log("User inserted successfully! 🎉");
      } catch (err) {
        console.error("Error inserting user:", err.message);
      }
    };

    insertUserData();
  }, [isSignedIn, user]); // Runs only when `user` state changes

  return <p>Signing in...</p>;
};

export default SignInHandler;
