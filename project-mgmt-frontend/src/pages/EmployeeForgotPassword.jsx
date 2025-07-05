import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import keellsLogo from '../assets/keells_logo.png';
import { requestPasswordReset, verifyOtp, resetPassword } from '../services/employeeApi';

export default function EmployeeForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1: email/job role, 2: OTP, 3: new password
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestReset = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !jobRole) {
      toast.error('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    if (!email.includes('@')) {
      toast.error('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

   requestPasswordReset({ email, jobRole })
      .then(() => {
        toast.success('OTP sent to your email!');
        setStep(2);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toast.error(error.response.data);
        } else {
          toast.error('Failed to request password reset. Please try again.');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const otpString = otp.join('');
    if (otpString.length !== 5) {
      toast.error('Please enter the complete 5-digit OTP.');
      setIsLoading(false);
      return;
    }

    verifyOtp({ email, jobRole, otp: otpString })
      .then(() => {
        toast.success('OTP verified successfully!');
        setStep(3);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toast.error(error.response.data);
        } else {
          toast.error('OTP verification failed. Please try again.');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      setIsLoading(false);
      return;
    }

    resetPassword({ email, jobRole, newPassword })
      .then(() => {
        toast.success('Password reset successfully! Redirecting to login...');
        setTimeout(() => navigate('/'), 2000);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toast.error(error.response.data);
        } else {
          toast.error('Failed to reset password. Please try again.');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return; // Only allow numbers
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input
    if (value && index < 4) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src={keellsLogo}
          alt="Keells Logo"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {step === 1 && (
            <form className="space-y-6" onSubmit={handleRequestReset}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Work Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    placeholder="your.name@keells.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="jobRole" className="block text-sm font-medium text-gray-700">
                  Job Role
                </label>
                <div className="mt-1">
                  <select
                    id="jobRole"
                    name="jobRole"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  >
                    <option value="">-- Select Job Role --</option>
                    <option value="designer">Designer</option>
                    <option value="admin">Admin</option>
                    <option value="architecture">Architecture</option>
                    <option value="design_manager">Design Manager</option>
                    <option value="architecture_manager">Architecture Manager</option>
                    <option value="project_manager">Project Manager</option>
                    <option value="civil_engineer">Civil Engineer</option>
                    <option value="civil_officer">Civil Officer</option>
                    <option value="property_officer">Property Officer</option>
                    <option value="property_manager">Property Manager</option>
                    <option value="property_executive">Property Executive</option>
                    <option value="procurement_manager">Procurement Manager</option>
                    <option value="lawyer">Lawyer</option>
                    <option value="head_of_department">Head of Department</option>
                  </select>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : 'Request Reset'}
                </button>
              </div>

              <div className="text-sm text-center">
                <Link to="/employee-login" className="font-medium text-emerald-600 hover:text-emerald-500">
                  Back to Login
                </Link>
              </div>
            </form>
          )}

          {step === 2 && (
            <form className="space-y-6" onSubmit={handleVerifyOtp}>
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  We've sent a 5-digit OTP to your email <span className="font-semibold">{email}</span>. Please enter it below.
                </p>
                
                <div className="flex justify-center space-x-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !digit && index > 0) {
                          document.getElementById(`otp-${index - 1}`).focus();
                        }
                      }}
                      className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </>
                  ) : 'Verify OTP'}
                </button>
              </div>

              <div className="text-sm text-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="font-medium text-emerald-600 hover:text-emerald-500"
                >
                  Back to Email
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form className="space-y-6" onSubmit={handleResetPassword}>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 8 characters long.
                </p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Resetting...
                    </>
                  ) : 'Reset Password'}
                </button>
              </div>

              <div className="text-sm text-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="font-medium text-emerald-600 hover:text-emerald-500"
                >
                  Back to OTP
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}