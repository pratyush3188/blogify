import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteurl)        // using lowercase key
            .setProject(conf.appwriteprojectid);  // using lowercase key

        this.account = new Account(this.client);
    }

    // Create new account
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if (userAccount) {
                // Auto login after signup
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("AuthService :: createAccount :: error", error);
            throw error;
        }
    }

    // Login user
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("AuthService :: login :: error", error);
            throw error;
        }
    }

    // Get current logged-in user
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("AuthService :: getCurrentUser :: error", error);
            return null;
        }
    }

    // Logout user
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("AuthService :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;
