import React, { useState } from 'react';
import Button from './Button';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };
  
  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-gray-300 mb-8">
            Get exclusive deals, fitness tips, and be the first to know about new products.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="flex-grow">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && (
                <p className="mt-2 text-left text-red-400 text-sm">{error}</p>
              )}
            </div>
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              isLoading={isSubmitting}
              className="whitespace-nowrap"
            >
              Subscribe
            </Button>
          </form>
          
          {isSuccess && (
            <p className="mt-4 text-gray-300 bg-gray-700 rounded-lg py-2 px-4 inline-block">
              Thank you for subscribing!
            </p>
          )}
          
          <p className="mt-4 text-sm text-gray-400">
            By subscribing, you agree to our Privacy Policy and consent to receive marketing emails.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;