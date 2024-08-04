import { Document } from "mongodb";


export interface IUser extends Document {
  googleId: string;
  email: string;
  emailVerified: boolean;
  name: string;
  picture: string;
  givenName: string;
  familyName: string;
};
