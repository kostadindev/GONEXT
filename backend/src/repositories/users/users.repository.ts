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
}

export default new UserRepository();
