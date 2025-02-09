import NextAuth from "@node_modules/next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@utils/database'
import User from "@models/user";

declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        })
    ],

    callbacks: {
        async session ({session}) {
            const sessionUser = await User.findOne({
                email: session.user?.email
            })

            if (session.user) {
                session.user.id = sessionUser._id.toString();
            }
            return session;        
        },

        async signIn ({ profile }) {
            try {
                await connectToDB()

                // Check if user already exists
                const userExists = await User.findOne({email: profile?.email})

                // If not create a user and them to the database
                if(!userExists){
                    await User.create({
                        email: profile?.email,
                        username: profile?.name?.replace(" ","").toLowerCase(),
                        image: profile?.image
                    })
                }
                

            } catch (error) {
                console.log(error);
                return false;
            }
            return true;            
        },

    }

    
   
})

export { handler as GET, handler as POST};