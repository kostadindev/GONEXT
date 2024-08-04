import usersRepository from "../repositories/users/users.repository";

class AuthService {
  public async findOrCreateUser(
    googleId: string,
    email: string,
    emailVerified: boolean,
    name: string,
    picture: string,
    givenName: string,
    familyName: string
  ) {
    let user = await usersRepository.findUserByGoogleId(googleId);

    if (!user) {
      user = await usersRepository.createUser(
        googleId,
        email,
        emailVerified,
        name,
        picture,
        givenName,
        familyName
      );
    }
    return user;
  }
}

export default new AuthService();
