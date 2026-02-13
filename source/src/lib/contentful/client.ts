import { createClient } from "contentful";
import { createClient as createManagementClient } from "contentful-management";

if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) {
  throw new Error("NEXT_PUBLIC_CONTENTFUL_SPACE_ID is not defined");
}

if (!process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
  throw new Error("NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN is not defined");
}

export const contentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || "master",
});

export const getContentfulManagementClient = () => {
  if (!process.env.CONTENTFUL_MANAGEMENT_TOKEN) {
    throw new Error("CONTENTFUL_MANAGEMENT_TOKEN is not defined");
  }
  
  return createManagementClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  });
};

export const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
export const CONTENTFUL_ENVIRONMENT = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || "master";
