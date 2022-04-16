import { Document } from "mongoose";

export default interface IUser extends Document {
  mail: string;
  name: string;
  password: string;
}
