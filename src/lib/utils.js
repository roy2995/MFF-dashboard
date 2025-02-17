import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

 export function getUserInfoFromToken(token) {
    try {
      const payloadBase64 = token.split(".")[1]; // Get the payload part
      const payloadDecoded = JSON.parse(atob(payloadBase64)); // Decode Base64
  
      // Parse authorities to get role ID
      const authorities = JSON.parse(payloadDecoded.authorities);
      const roleId = authorities[0]?.id || null;
  
      // Extract username directly
      const username = payloadDecoded.username || null;
  
      return { username, roleId };
    } catch (error) {
      console.error("Error decoding token:", error);
      return { username: null, roleId: null };
    }
  }

 

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

