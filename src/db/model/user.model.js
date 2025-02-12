import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { getNextSequenceValue } from "./counter.model.js";

const userSchema = new mongoose.Schema({
   userId: { type: Number, index: true, unique: true },
   firstName: { type: String, required: true },
   lastName: { type: String, required: true },
   username: { type: String, required: true, unique: true, index: true },
   password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
   if (this.isNew) {
      this.userId = await getNextSequenceValue("userId");
   }
   if (!this.isModified("password")) return next();
   this.password = await bcrypt.hash(this.password, 10);
   next();
});

userSchema.methods.comparePassword = async function (password) {
   return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
