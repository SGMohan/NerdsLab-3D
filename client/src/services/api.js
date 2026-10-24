// Resolve API base URL cleanly, handling trailing slashes and ensuring the /api namespace
const getApiBase = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim()) {
    const clean = envUrl.trim().replace(/\/+$/, '');
    return clean.endsWith('/api') ? clean : `${clean}/api`;
  }
  return '/api';
};

const API_BASE = getApiBase();

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `API request failed with status ${res.status}`);
  }
  return data;
};

export const api = {
  // Public Courses
  getCourses: async () => {
    const res = await fetch(`${API_BASE}/courses`);
    return handleResponse(res);
  },

  getCourseBySlug: async (slug) => {
    const res = await fetch(`${API_BASE}/courses/${slug}`);
    return handleResponse(res);
  },

  // Public Testimonials
  getTestimonials: async () => {
    const res = await fetch(`${API_BASE}/testimonials`);
    return handleResponse(res);
  },

  // Public FAQs
  getFAQs: async () => {
    const res = await fetch(`${API_BASE}/faqs`);
    return handleResponse(res);
  },

  // Public Enquiry Submission
  submitEnquiry: async (enquiryData) => {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiryData),
    });
    return handleResponse(res);
  },
};
