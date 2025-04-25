import React, { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react';
import Button from '../components/ui/Button';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-blue-100">
              We'd love to hear from you. Our friendly team is always here to chat.
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Info */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <MapPin className="w-10 h-10 text-blue-600" />,
                title: 'Visit Us',
                description: '123 Fitness Ave, Muscle City, MC 12345',
              },
              {
                icon: <Mail className="w-10 h-10 text-blue-600" />,
                title: 'Email Us',
                description: 'info@flexfit.com',
                action: 'Send Email',
                link: 'mailto:info@flexfit.com'
              },
              {
                icon: <Phone className="w-10 h-10 text-blue-600" />,
                title: 'Call Us',
                description: '(123) 456-7890',
                action: 'Call Now',
                link: 'tel:1234567890'
              },
              {
                icon: <Clock className="w-10 h-10 text-blue-600" />,
                title: 'Business Hours',
                description: 'Mon-Fri: 9AM-6PM Sat: 10AM-4PM',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                {item.action && item.link && (
                  <a 
                    href={item.link} 
                    className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                  >
                    {item.action}
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Contact Form and Map */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              {isSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p>Your message has been sent successfully! We'll get back to you soon.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a subject</option>
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Order Status">Order Status</option>
                      <option value="Returns">Returns</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                    ></textarea>
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                  </div>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full flex items-center justify-center"
                  >
                    <Send size={18} className="mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
            
            {/* Map */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Our Location</h2>
              <div className="rounded-lg overflow-hidden h-96 bg-gray-200">
                {/* In a real implementation, you would embed a Google Map or similar here */}
                <div className="h-full w-full flex items-center justify-center bg-blue-50">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">FlexFit Headquarters</h3>
                    <p className="text-gray-600">123 Fitness Ave, Muscle City, MC 12345</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our products, shipping, returns, and more.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: 'How long does shipping take?',
                answer: 'Standard shipping typically takes 3-5 business days within the continental US. Expedited shipping options are available at checkout.'
              },
              {
                question: 'What is your return policy?',
                answer: 'We offer a 30-day return policy on all unused items in their original packaging. Simply contact our customer service team to initiate a return.'
              },
              {
                question: 'Do you ship internationally?',
                answer: 'Yes, we ship to many countries worldwide. International shipping rates and delivery times vary by location.'
              },
              {
                question: 'How can I track my order?',
                answer: 'Once your order ships, you will receive a confirmation email with tracking information. You can also track your order from your account dashboard.'
              },
            ].map((item, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;