import { User } from "@/interfaces/users.interface";

declare global {
    namespace Express {
     export interface Request {
         user: User
     }
   }
   }