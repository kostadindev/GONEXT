import { LLMOptions } from "../../models/llm.models";
import { Themes, Languages } from "../../models/users.models";
import { User } from "./users.mongo";

class UserRepository {
  public async findUserByGoogleId(googleId: string) {
    return User.findOne({ googleId });
  }

  public async createUser(
    googleId: string,
    email: string,
    emailVerified: boolean,
    name: string,
    picture: string,
    givenName: string,
    familyName: string
  ) {
    const user = new User({
      googleId,
      email,
      emailVerified,
      name,
      picture,
      givenName,
      familyName
    });
    return user.save();
  }

  public async updateUserLLM(usedId: string, llm: LLMOptions) {
    try {
      return await User.findOneAndUpdate(
        { _id: usedId },
        { llm },
        { new: true } // Return the updated document
      ).exec();
    } catch (error) {
      throw new Error(`Error updating LLM for user with ID ${usedId}: ${error}`);
    }
  }

  public async updateUserTheme(usedId: string, theme: Themes) {
    try {
      return await User.findOneAndUpdate(
        { _id: usedId },
        { theme },
        { new: true } // Return the updated document
      ).exec();
    } catch (error) {
      throw new Error(`Error updating theme for user with ID ${usedId}: ${error}`);
    }
  }

  public async updateUserLanguage(usedId: string, language: Languages) {
    try {
      return await User.findOneAndUpdate(
        { _id: usedId },
        { language },
        { new: true } // Return the updated document
      ).exec();
    } catch (error) {
      throw new Error(`Error updating language for user with ID ${usedId}: ${error}`);
    }
  }
}

export default new UserRepository();
