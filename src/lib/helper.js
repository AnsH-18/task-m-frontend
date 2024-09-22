export default function formatDate(dateString) {
    // Parse the input date string
    const date = new Date(dateString);
  
  // Convert to UTC and format as ISO 8601
  return date.toISOString();
  }