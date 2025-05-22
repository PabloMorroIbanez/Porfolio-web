
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Reset status after delay
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 md:py-32 px-6 bg-green-soft">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-space font-semibold mb-16 tracking-tight">
          Get In Touch
        </h2>
        
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left column - Contact form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  aria-required="true"
                />
              </div>
              
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  aria-required="true"
                />
              </div>
              
              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  aria-required="true"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-3 px-8 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black",
                  isSubmitting 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-black text-white hover:bg-gray-800"
                )}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {submitStatus === 'success' && (
                <div className="text-green-600 text-sm mt-2">
                  Message sent successfully!
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="text-red-600 text-sm mt-2">
                  There was an error sending your message. Please try again.
                </div>
              )}
            </form>
          </div>
          
          {/* Right column - Links and info */}
          <div className="flex flex-col justify-between">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-space font-medium mb-4">Let's Connect</h3>
                <p className="text-gray-700">
                  Have a project in mind or just want to chat about UX design and gaming? 
                  Feel free to reach out through the form or connect with me on social media.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-space font-medium mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <svg 
                      className="w-5 h-5" 
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                    </svg>
                  </a>
                  
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Behance Profile"
                    className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <svg 
                      className="w-5 h-5" 
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.443 5.34C8.082 5.34 8.673 5.39 9.213 5.539C9.754 5.687 10.197 5.911 10.645 6.209C11.093 6.507 11.443 6.906 11.692 7.404C11.942 7.903 12.066 8.501 12.066 9.2C12.066 9.998 11.893 10.697 11.545 11.295C11.197 11.894 10.7 12.392 10.004 12.79C10.898 13.088 11.59 13.635 12.037 14.384C12.484 15.132 12.707 15.98 12.707 16.927C12.707 17.825 12.532 18.624 12.186 19.322C11.838 20.021 11.341 20.569 10.748 21.018C10.154 21.416 9.46 21.765 8.717 21.963C7.923 22.162 7.129 22.261 6.285 22.261H0V5.34H7.443ZM6.936 12.442C7.53 12.442 8.023 12.293 8.42 11.993C8.816 11.694 9.016 11.195 9.016 10.498C9.016 10.048 8.942 9.699 8.792 9.45C8.643 9.2 8.445 9 8.196 8.9C7.948 8.751 7.674 8.652 7.376 8.602C7.077 8.552 6.783 8.527 6.484 8.527H3.162V12.442H6.936ZM7.176 19.073C7.526 19.073 7.85 19.023 8.174 18.974C8.495 18.924 8.792 18.774 9.04 18.575C9.29 18.376 9.488 18.126 9.638 17.777C9.787 17.428 9.862 16.978 9.862 16.479C9.862 15.481 9.587 14.782 9.04 14.333C8.495 13.884 7.8 13.685 6.959 13.685H3.162V19.049H7.176V19.073ZM16.912 19.073C17.36 19.522 18.056 19.772 18.975 19.772C19.647 19.772 20.218 19.572 20.691 19.173C21.164 18.774 21.461 18.376 21.586 17.976H24.302C23.779 19.273 22.957 20.222 21.932 20.819C20.908 21.417 19.684 21.716 18.256 21.716C17.22 21.716 16.283 21.566 15.458 21.218C14.632 20.869 13.932 20.42 13.36 19.772C12.787 19.123 12.337 18.325 12.064 17.378C11.765 16.429 11.616 15.382 11.616 14.183C11.616 13.036 11.765 11.963 12.064 11.016C12.362 10.068 12.787 9.221 13.385 8.527C13.981 7.83 14.707 7.281 15.557 6.882C16.408 6.483 17.384 6.258 18.455 6.258C19.623 6.258 20.641 6.508 21.538 7.007C22.435 7.505 23.158 8.204 23.703 9.072C24.252 9.939 24.626 10.937 24.85 12.034C24.976 13.135 25 14.234 24.925 15.332H14.657C14.657 16.429 14.931 17.378 15.458 18.077C15.985 18.774 16.837 19.123 17.56 19.123M20.171 10.997C19.823 10.598 19.227 10.398 18.506 10.398C18.006 10.398 17.56 10.498 17.262 10.697C16.962 10.896 16.738 11.146 16.539 11.395C16.364 11.644 16.239 11.943 16.189 12.243C16.139 12.542 16.114 12.79 16.089 13.04H21C15.657 13.04 15.032 11.445 14.532 10.947M15.607 7.406H19.92V8.602H15.607V7.406Z" />
                    </svg>
                  </a>
                  
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Dribbble Profile"
                    className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <svg 
                      className="w-5 h-5" 
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.375 0 0 5.375 0 12C0 18.625 5.375 24 12 24C18.625 24 24 18.625 24 12C24 5.375 18.625 0 12 0ZM19.937 5.562C21.312 7.25 22.062 9.5 22.125 11.938C21.75 11.875 18.375 11.0625 15 11.5C14.875 11.1875 14.75 10.875 14.562 10.5625C18.125 8.875 19.625 5.937 19.937 5.562ZM12 1.937C14.625 1.937 17 3 18.812 4.75C18.5 5.125 17.125 7.875 13.75 9.375C12 5.75 10.062 2.875 9.75 2.375C10.5 2.125 11.25 1.937 12 1.937ZM7.75 3.187C8.062 3.625 9.937 6.5 11.75 10.062C6.812 11.5 2.5 11.5 2.062 11.5C2.75 7.812 4.875 4.75 7.75 3.187ZM1.875 12C1.875 11.875 1.875 11.75 1.875 11.625C2.312 11.625 7.312 11.687 12.75 9.937C13 10.375 13.187 10.812 13.437 11.25C9.812 12.312 6.5 15.875 4.937 18.75C3.062 17 1.875 14.625 1.875 12ZM12 22.125C9.625 22.125 7.437 21.25 5.75 19.75C6.125 19.5 8.25 16.25 12.812 14.25C14.062 17.875 14.625 20.875 14.75 21.812C13.875 22 12.937 22.125 12 22.125ZM16.5 20.75C16.437 20.125 15.875 17.25 14.75 13.687C17.937 13.125 20.75 14.125 21.125 14.25C20.75 16.937 19 19.187 16.5 20.75Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <p className="text-sm text-gray-600">
                Based in Madrid, Spain<br />
                Available for freelance projects worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
