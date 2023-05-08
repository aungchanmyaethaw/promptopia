import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";
import { DefaultSession, Profile } from "next-auth";

const clientId: string = process.env.GOOGLE_ID || "";

const clientSecret: string = process.env.GOOGLE_CLIENT_SECRET || "";

const secret: string = process.env.NEXTAUTH_SECRET || "";

interface ProfileProps extends Profile {
  picture?: string;
}

const handler = NextAuth({
  secret,
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session?.user?.email });

      if (!sessionUser) {
        throw new Error(`User not found for email ${session?.user?.email}`);
      }

      const sessionWithId = {
        ...session,
        user: {
          ...session.user,
          id: sessionUser._id.toString(),
        },
      };

      return sessionWithId;
    },

    async signIn(context) {
      const profile: ProfileProps | undefined = context.profile;

      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile?.email });

        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.split(" ").join("").toLowerCase(),
            image: profile?.picture,
          });
        }

        return true;
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
