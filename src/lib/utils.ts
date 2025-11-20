import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Validates an email address format
 * @param email - The email address to validate
 * @returns An object with isValid boolean and errorMessage string
 */
export function validateEmail(email: string): { isValid: boolean; errorMessage: string } {
  if (!email || email.trim() === '') {
    return {
      isValid: false,
      errorMessage: 'Email is required'
    };
  }

  // Step 1: Check basic email format (local@domain)
  const basicEmailRegex = /^[^\s@]+@[^\s@]+$/;
  if (!basicEmailRegex.test(email)) {
    return {
      isValid: false,
      errorMessage: 'Please enter a valid email address (e.g., user@example.com)'
    };
  }

  // Step 2: Check if domain has at least one dot
  const domainParts = email.split('@');
  if (domainParts.length !== 2 || !domainParts[1].includes('.')) {
    return {
      isValid: false,
      errorMessage: 'Email must include a domain (e.g., example.com)'
    };
  }

  // Step 3: Check if TLD is valid (at least 2 characters after the last dot)
  const lastDotIndex = domainParts[1].lastIndexOf('.');
  const tld = domainParts[1].substring(lastDotIndex + 1);
  if (tld.length < 2) {
    return {
      isValid: false,
      errorMessage: 'Email must end with a valid domain extension (e.g., .com, .org)'
    };
  }

  // Step 4: Additional validation for the domain and TLD format
  const domainRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!domainRegex.test(domainParts[1])) {
    return {
      isValid: false,
      errorMessage: 'Please enter a valid email domain'
    };
  }

  return {
    isValid: true,
    errorMessage: ''
  };
}
