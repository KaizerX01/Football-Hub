import { db } from "@/db";
import { newUser } from "../lib/authentification";
import { users } from "@/db/schema";
import { UpdatedUser } from "@/lib/user";



const addNewUser = async (user: newUser) => {
    const res = db
        .insert(users)
        .values(user)
}

