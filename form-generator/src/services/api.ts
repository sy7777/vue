import { GENERIC_ERROR_MESSAGE } from "@/constants";

export const handleServerError = (error: any): void => {
  console.error(error);

  const message: string = (error.data || {}).message || GENERIC_ERROR_MESSAGE;

  console.log("message", message);

  throw new Error(message);
};
