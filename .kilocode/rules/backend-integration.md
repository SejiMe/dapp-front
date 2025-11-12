## Brief overview

Guidelines for integrating with ASP.NET Core backend API and handling standard error responses for the Dengue Watch application.

## Communication style

- Use standard HTTP status codes and error response formats
- Follow ProblemDetails schema for structured error responses
- Implement proper error boundaries and user feedback
- Log API responses appropriately for debugging

## Development workflow

- Use ASP.NET Core standard response patterns
- Implement ProblemDetails as standard error response format
- Follow the provided JSON schemas for API contracts
- Use proper TypeScript interfaces for all API responses
- Handle validation errors and business logic errors separately

## Coding best practices

- Use the ErrorSchema.json format for all error responses
- Implement ProblemDetails interface for structured error information
- Use proper HTTP status codes (400, 401, 404, 500, etc.)
- Create specific TypeScript interfaces for each API endpoint response
- Use date-fns for all date formatting ("yyyy-MM-dd" format)
- Implement proper retry logic with exponential backoff
- Log both successful and failed API requests

## Project context

- Backend uses ASP.NET Core with standard error handling
- API responses follow ProblemDetails pattern
- Prediction API returns structured prediction data with validation
- Historical data API provides paginated responses with metadata
- All dates must be formatted as "yyyy-MM-dd" for API calls

## API response standards

- Success responses: Return data directly with 200 status
- Error responses: Use ProblemDetails format with:
  - type: Error type identifier
  - title: Human-readable error title
  - status: HTTP status code
  - detail: Specific error details
  - instance: Unique error instance identifier
- Validation errors: Return 400 status with validation details
- Not found: Return 404 status with resource not found message
- Server errors: Return 500 status with internal server error message

## Error handling patterns

```typescript
// Standard error response handling
try {
  const response = await apiCall();
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
} catch (error) {
  // Log error for debugging
  console.error("API call failed:", error);
  throw error;
}
```

## Schema compliance

- All API responses must match the provided JSON schemas
- Use proper TypeScript types generated from schemas
- Validate responses against schemas when possible
- Implement proper null checks for optional fields
- Use correct data types (string, number, boolean, arrays)
