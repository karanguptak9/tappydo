'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Thanks for reaching out! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            I'd love to hear from you. Whether you have a question or just want to say hi, feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-100"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-100"
                  placeholder="john@example.com"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-100"
                  placeholder="Project Inquiry"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-100 resize-none"
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-8 py-3 bg-amber-700 text-white rounded-lg font-semibold hover:bg-amber-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Email */}
            <div className="bg-white p-6 rounded-lg border border-amber-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
              <a href="mailto:karangupta.k9@gmail.com" className="text-amber-700 hover:text-amber-800 font-semibold">
                karangupta.k9@gmail.com
              </a>
              <p className="text-gray-600 text-sm mt-2">I'll respond within 24 hours</p>
            </div>

            {/* Phone */}
            <div className="bg-white p-6 rounded-lg border border-amber-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Phone</h3>
              <a href="tel:+14159329312" className="text-amber-700 hover:text-amber-800 font-semibold">
                +1 (415) 932-9312
              </a>
              <p className="text-gray-600 text-sm mt-2">Available for calls Mon-Fri, 9-5 PST</p>
            </div>

            {/* Location */}
            <div className="bg-white p-6 rounded-lg border border-amber-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Location</h3>
              <p className="text-amber-700 font-semibold">San Francisco Bay Area, CA</p>
              <p className="text-gray-600 text-sm mt-2">Open to remote work and collaborations</p>
            </div>

            {/* Social Links */}
            <div className="bg-white p-6 rounded-lg border border-amber-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Connect with me</h3>
              <div className="flex gap-4">
                <a href="https://twitter.com" className="text-gray-600 hover:text-amber-700 text-2xl">
                  𝕏
                </a>
                <a href="https://linkedin.com" className="text-gray-600 hover:text-amber-700 text-2xl">
                  in
                </a>
                <a href="https://github.com" className="text-gray-600 hover:text-amber-700 text-2xl">
                  &lt;/&gt;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
