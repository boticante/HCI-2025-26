"use server";

import {
  getContentfulManagementClient,
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT,
} from "@/lib/contentful/client";
import type { ReviewFormData } from "@/types/review";

export async function submitReview(data: ReviewFormData) {
  try {
    if (!data.name || !data.rating || !data.review) {
      return { success: false, error: "Please fill in all required fields" };
    }

    if (data.rating < 1 || data.rating > 5) {
      return { success: false, error: "Rating must be between 1 and 5" };
    }

    // Get management client (server-side only)
    const contentfulManagementClient = getContentfulManagementClient();
    
    // Get space and environment
    const space = await contentfulManagementClient.getSpace(CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment(CONTENTFUL_ENVIRONMENT);

    // Create the review entry
    const entry = await environment.createEntry("review", {
      fields: {
        name: {
          "en-US": data.name,
        },
        rating: {
          "en-US": data.rating,
        },
        review: {
          "en-US": data.review,
        },
        date: {
          "en-US": new Date().toISOString(),
        },
      },
    });

    // Publish the entry
    await entry.publish();

    return { 
      success: true, 
      message: "Review submitted successfully!",
      review: {
        id: entry.sys.id,
        name: data.name,
        rating: data.rating,
        review: data.review,
        date: new Date().toISOString(),
      }
    };
  } catch (error) {
    console.error("Error submitting review:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to submit review",
    };
  }
}
