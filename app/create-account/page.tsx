'use client';

import { useState } from 'react';

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'developer'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length === 0) {
      // Handle form submission
      console.log('Form submitted:', formData);
      // Here you would typically make an API call
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono text-[#E70008] mb-4">
              Create Account
            </h1>
            <p className="text-[#F9E4AD] font-mono text-sm sm:text-base">
              Join the Magna Coders community
            </p>
          </div>

          <div className="border border-[#E70008] rounded-lg p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div>
                <label className="block text-[#F9E4AD] font-mono text-sm font-medium mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-black border border-[#E70008] rounded-md text-[#F9E4AD] font-mono placeholder-[#F9E4AD]/50 focus:outline-none focus:border-[#FF9940] focus:ring-1 focus:ring-[#FF9940]"
                  placeholder="Enter your username"
                />
                {errors.username && (
                  <p className="text-[#E70008] font-mono text-xs mt-1">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-[#F9E4AD] font-mono text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-black border border-[#E70008] rounded-md text-[#F9E4AD] font-mono placeholder-[#F9E4AD]/50 focus:outline-none focus:border-[#FF9940] focus:ring-1 focus:ring-[#FF9940]"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-[#E70008] font-mono text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="block text-[#F9E4AD] font-mono text-sm font-medium mb-2">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-black border border-[#E70008] rounded-md text-[#F9E4AD] font-mono focus:outline-none focus:border-[#FF9940] focus:ring-1 focus:ring-[#FF9940]"
                >
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="problem-solver">Problem Solver</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[#F9E4AD] font-mono text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-black border border-[#E70008] rounded-md text-[#F9E4AD] font-mono placeholder-[#F9E4AD]/50 focus:outline-none focus:border-[#FF9940] focus:ring-1 focus:ring-[#FF9940]"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-[#E70008] font-mono text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[#F9E4AD] font-mono text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-black border border-[#E70008] rounded-md text-[#F9E4AD] font-mono placeholder-[#F9E4AD]/50 focus:outline-none focus:border-[#FF9940] focus:ring-1 focus:ring-[#FF9940]"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="text-[#E70008] font-mono text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#E70008] hover:bg-[#FF9940] text-black font-mono font-bold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF9940] focus:ring-offset-2 focus:ring-offset-black"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[#F9E4AD] font-mono text-sm">
                Already have an account?{' '}
                <a href="/login" className="text-[#FF9940] hover:text-[#E70008] font-mono">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}