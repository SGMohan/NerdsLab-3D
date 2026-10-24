const API_BASE = import.meta.env.VITE_API_URL || '/api';

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'API request failed');
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
