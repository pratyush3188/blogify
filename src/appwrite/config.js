import conf from '../conf/conf.js';
import {
  Client,
  ID,
  Databases,
  Storage,
  Query,
  Permission,
  Role,
  Account,   // ✅ import Account
} from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  account; // ✅ declare account

  constructor() {
    this.client
      .setEndpoint(conf.appwriteurl)       // Appwrite endpoint
      .setProject(conf.appwriteprojectid); // Project ID

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    this.account = new Account(this.client); // ✅ initialize account
  }

  // ======================
  // POSTS
  // ======================
// CREATE POST
async createPost({ title, slug, content, featureImage, status, userId }) {
  try {
    return await this.databases.createDocument(
      conf.appwritedatabaseid,
      conf.appwritecollectionid,
      ID.unique(), // ✅ Use unique ID instead of slug
      {
        title,
        slug, // ✅ Save slug as a field instead of document ID
        content,
        featureImage,
        status,
        userId,
      }
    );
  } catch (error) {
    console.error("Appwrite createPost error:", error.message || error);
    throw error;
  }
}


  async updatePost(slug, { title, content, featureImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        slug,
        { title, content, featureImage, status }
      );
    } catch (error) {
      console.error("Service :: updatePost :: error", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        slug
      );
      return true;
    } catch (error) {
      console.error("Service :: deletePost :: error", error);
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        slug
      );
    } catch (error) {
      console.error("Service :: getPost :: error", error);
      throw error;
    }
  }

  async getPosts() {
    try {
      const response = await this.databases.listDocuments(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        [Query.notEqual("title", "")]
      );
      return response.documents || [];
    } catch (error) {
      console.error("Error fetching posts:", error.message);
      return [];
    }
  }

  // ======================
  // FILE STORAGE
  // ======================
  async uploadFile(file, userId) {
    try {
      return await this.bucket.createFile(
        conf.appwritebucketid,
        ID.unique(),
        file,
        [
          Permission.read(Role.any()),
          Permission.write(Role.user(userId)),
        ]
      );
    } catch (error) {
      console.error("Appwrite service :: uploadFile :: error", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    if (!fileId) throw new Error("No fileId provided for deletion");
    try {
      await this.bucket.deleteFile(conf.appwritebucketid, fileId);
      return true;
    } catch (error) {
      console.error("Service :: deleteFile :: error", error);
      throw error;
    }
  }

  getFilePreview(fileId) {
    if (!fileId) return null;
    return this.bucket.getFilePreview(conf.appwritebucketid, fileId);
  }
}

// ✅ Export single instance
const service = new Service();
export default service;
