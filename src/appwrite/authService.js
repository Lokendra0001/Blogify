import conf from "../conf/conf";
import { Client, Account, ID, OAuthProvider } from "appwrite";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const isCreated = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (isCreated) return this.loginAccount({ email, password });
    } catch (err) {
      console.log("Create Account Error ::" + err);
      return err;
    }
  }

  async loginAccount({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
      return false
    } catch (error) {
      console.log("Login Account error ::" + error);
    }
  }

  async logoutAccount() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Delete Account error ::" + error);
    }
  }

  async getCurrentuser() {
    try {
      const user = await this.account.get();
      if (user) return user;
    } catch (error) {
      // console.log("User NOt Found " + error);
      return error;
    }
  }

  async getSession() {
    try {
      return await account.getSession("current");
    } catch (error) {
      return null;
    }
  }

  loginWithGoogle() {
    return this.account.createOAuth2Session(
      "google",
      "http://blogify03.vercel.app/",
      "http://blogify03.vercel.app/login"
    );
  }
  loginWithGithub() {
    return this.account.createOAuth2Session(
      "github",
      "http://blogify03.vercel.app/",
      "http://blogify03.vercel.app/login"
    );
  }
}

const authService = new AuthService();
export default authService;
