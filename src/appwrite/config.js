import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteurl)        // using lowercase key
            .setProject(conf.appwriteprojectid);  // using lowercase key

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // CREATE POST
   // inside your Service class
async createPost({ title, slug, content, featureImage, status, userId }) {
  try {
    return await this.databases.createDocument(
      conf.appwritedatabaseid,
      conf.appwritecollectionid,
      slug,   // using slug as unique ID
      {
        title,
        content,
        featureImage,
        status,
        userId,   // ✅ save userId
      }
    );
  } catch (error) {
    console.error("Appwrite createPost error:", error.message || error);
    throw error;
  }
}


    // UPDATE POST
    async updatePost(slug, { title, content, featureImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                }
            );
        } catch (error) {
            console.error("Service :: updatePost :: error", error);
            throw error;
        }
    }

    // DELETE POST
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

    // GET SINGLE POST
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

    // GET MULTIPLE POSTS
// GET MULTIPLE POSTS
async getPosts() {
  try {
    const response = await this.databases.listDocuments(
      conf.appwritedatabaseid,
      conf.appwritecollectionid,
      [
        Query.notEqual("title", ""),
      ]
    );
    return response.documents || [];
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];  // ✅ always return empty array instead of undefined
  }
}


  async uploadFile(file) {
    try {
      const uploadedFile = await this.bucket.createFile(
        conf.appwritebucketid,
        ID.unique(),
        file
      );
      return uploadedFile; // contains $id
    } catch (error) {
      console.log("Error uploading file:", error);
      return null;
    }
  }

    // DELETE FILE
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

    // GET FILE PREVIEW
     getFilePreview(fileId) {
    if (!fileId) return null;
    return this.bucket.getFilePreview(conf.appwritebucketid, fileId);
  }

}

const service = new Service();
export default service;
