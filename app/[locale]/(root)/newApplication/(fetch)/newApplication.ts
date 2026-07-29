"use server";

import { createNewApplication } from "@/app/models/db/lib/services/careers";
import { newCareer } from "@/types";

export const newApplication = async (data: newCareer) => {
  const result = await createNewApplication(data);
  return {
    message: result.message,
    success: result.success,
    status: result.statusCode,
  };
};
