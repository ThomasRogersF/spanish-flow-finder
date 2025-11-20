# Email Validation Implementation Plan

## Overview
This document outlines the implementation of enhanced email validation for the Spanish Learning Funnel's lead capture form.

## Current State
- Basic HTML5 email validation using `type="email"`
- No custom validation logic or error messaging
- Form submission only checks if fields are non-empty

## Implementation Details

### 1. Email Validation Utility Function

**File:** `src/lib/utils.ts`

**Add the following function:**
```typescript
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

  // Email regex pattern that covers most valid email formats
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      errorMessage: 'Please enter a valid email address'
    };
  }

  return {
    isValid: true,
    errorMessage: ''
  };
}
```

### 2. Enhanced LeadCaptureScreen Component

**File:** `src/components/LeadCaptureScreen.tsx`

**Changes to implement:**

1. **Import the validation function:**
```typescript
import { validateEmail } from '../lib/utils';
```

2. **Add validation state:**
```typescript
const [validationErrors, setValidationErrors] = useState({
  email: ''
});
```

3. **Create validation handler:**
```typescript
const validateEmailField = (email: string) => {
  const validation = validateEmail(email);
  setValidationErrors(prev => ({
    ...prev,
    email: validation.errorMessage
  }));
  return validation.isValid;
};
```

4. **Update input change handler:**
```typescript
const handleInputChange = (field: string, value: string | boolean) => {
  setFormData(prev => ({
    ...prev,
    [field]: value
  }));
  
  // Clear email error when user starts typing again
  if (field === 'email' && validationErrors.email) {
    setValidationErrors(prev => ({
      ...prev,
      email: ''
    }));
  }
};
```

5. **Add blur handler for email field:**
```typescript
const handleEmailBlur = () => {
  if (formData.email) {
    validateEmailField(formData.email);
  }
};
```

6. **Update submit handler:**
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validate email
  const isEmailValid = validateEmailField(formData.email);
  
  if (formData.name && isEmailValid && formData.agreedToTerms) {
    onSubmit(formData);
  }
};
```

7. **Update email input field:**
```typescript
<input
  type="email"
  value={formData.email}
  onChange={(e) => handleInputChange('email', e.target.value)}
  onBlur={handleEmailBlur}
  className={`w-full px-4 py-3 rounded-2xl border transition-all ${
    validationErrors.email 
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
      : 'border-gray-300 input-focus'
  }`}
  placeholder="your.email@example.com"
  required
/>
```

8. **Add error message display:**
```typescript
{validationErrors.email && (
  <p className="text-red-500 text-sm mt-1 flex items-center">
    <span className="mr-1">⚠️</span>
    {validationErrors.email}
  </p>
)}
```

### 3. Styling Considerations

- Use red color scheme for errors (border, text, focus ring)
- Maintain consistent rounded corners and spacing
- Add warning emoji for visual attention
- Ensure error messages are accessible and readable

### 4. User Experience Flow

1. User enters email field
2. On blur (leaving the field), validation triggers
3. If invalid, error message appears and border turns red
4. When user starts typing again, error clears
5. On submit, final validation occurs
6. Form only submits with valid email

### 5. Testing Scenarios

Test with various email formats:
- Valid: user@example.com, user.name@domain.co.uk
- Invalid: user@, @domain.com, user.domain.com, user@
- Empty field
- Spaces only

## Benefits

1. **Better User Experience**: Clear, immediate feedback
2. **Data Quality**: Ensures valid email format
3. **Professional Appearance**: Consistent with modern form standards
4. **Reduced Support**: Fewer issues with invalid email submissions

## Implementation Order

1. Add validation utility function to utils.ts
2. Update LeadCaptureScreen component with validation logic
3. Test various scenarios
4. Verify styling matches existing design