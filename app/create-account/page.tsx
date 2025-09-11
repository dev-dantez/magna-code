'use client';

import { useState, useEffect, useRef } from 'react';

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'developer'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
  const [step, setStep] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

  // Ball animation along the perimeter
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const perimeter = 2 * (width + height); // Total perimeter length
    const totalSteps = 200; // Increased for smoother movement
    const segmentLength = perimeter / totalSteps;
    const speed = segmentLength / 0.05; // Match 50ms interval

    const getPosition = (step: number) => {
      const progress = (step % totalSteps) / totalSteps; // Normalize to 0-1
      const totalDistance = progress * perimeter;

      // Top edge: 0 to width
      if (totalDistance <= width) {
        return { x: totalDistance, y: 0 };
      }
      // Right edge: width to width + height
      else if (totalDistance <= width + height) {
        return { x: width, y: totalDistance - width };
      }
      // Bottom edge: width + height to 2*width + height
      else if (totalDistance <= 2 * width + height) {
        return { x: 2 * width + height - totalDistance, y: height };
      }
      // Left edge: 2*width + height to 2*(width + height)
      else {
        return { x: 0, y: 2 * (width + height) - totalDistance };
      }
    };

    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % totalSteps);
      const { x, y } = getPosition(step);
      setBallPosition({ x, y });
    }, 50); // Faster interval for smoother and quicker movement

    return () => clearInterval(interval);
  }, [step]);

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

          <div className="border border-[#E70008] rounded-lg p-6 sm:p-8 relative" ref={containerRef}>
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

            {/* Bouncing cream ball along perimeter */}
            <div
              className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-[#F9E4AD] rounded-full transition-all duration-300 ease-out"
              style={{
                left: `${ballPosition.x}px`,
                top: `${ballPosition.y}px`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}