import { Client, Account, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("6855146f00198c91d967");

export const account = new Account(client);

export const databases = new Databases(client, "685514b200271d2c0666");
