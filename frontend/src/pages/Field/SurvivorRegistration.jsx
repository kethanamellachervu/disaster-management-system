import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Heart, ArrowLeft, User, Phone, MapPin, Lock, UserCircle, CheckCircle2, Copy, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SurvivorRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    phone: '',
    location: '',
  });
  const [successCode, setSuccessCode] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      ...formData,
      role: 'survivor'
    };

    const result = await register(payload);
    setLoading(false);
    if (result.success) {
      setSuccessCode(result.uniqueCode);
    } else {
      setError(result.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(successCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (successCode) {
    return (
      <div className="auth-bg min-h-screen flex items-center justify-center p-4">
        <div className="glass-card max-w-md w-full p-10 rounded-2xl shadow-2xl text-center fade-in">
          <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-success-green to-green-700 shadow-lg shadow-green-500/30 mb-6">
            <CheckCircle2 className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful</h2>
          <p className="text-gray-500 mb-8 text-sm">Save your unique offline tracking code. You'll need it for identification.</p>
          
          <div className="relative bg-gray-900 p-6 rounded-xl mb-8">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Your Tracking Code</p>
            <p className="font-mono text-4xl font-bold tracking-[0.3em] text-white">
              {successCode}
            </p>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
              title="Copy code"
            >
              {copied ? <Check className="w-4 h-4 text-success-green" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <button
            id="proceed-to-login"
            onClick={() => navigate('/login')}
            className="w-full py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-success-green to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-500/25 transition-all"
          >
            Proceed to Login
          </button>
        </div>
      </div>
    );
  }

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter full name', icon: User, required: true },
    { name: 'username', label: 'Username', type: 'text', placeholder: 'Choose a username', icon: UserCircle, required: true },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Create a password', icon: Lock, required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'e.g. +91 98765 43210', icon: Phone, required: false },
    { name: 'location', label: 'Current Location', type: 'text', placeholder: 'City, Area or Coordinates', icon: MapPin, required: true },
  ];

  return (
    <div className="auth-bg min-h-screen flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="glass-card max-w-md w-full p-10 rounded-2xl shadow-2xl fade-in">
        {/* Header */}
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-warning-amber to-amber-600 shadow-lg shadow-amber-500/20">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Field Registration</h1>
          </div>
          <p className="text-sm text-gray-500 ml-[52px]">Register a survivor for disaster assistance</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" id="registration-form">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
              <span className="shrink-0">⚠</span>
              {error}
            </div>
          )}

          {fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={`field-${field.name}`} className="block text-sm font-semibold text-gray-700 mb-1.5">
                {field.label}
                {!field.required && <span className="text-gray-400 font-normal ml-1">(optional)</span>}
              </label>
              <div className="relative">
                <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id={`field-${field.name}`}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:bg-white"
                  onChange={handleChange}
                />
              </div>
            </div>
          ))}

          <button
            id="register-submit"
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3 bg-gradient-to-r from-warning-amber to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 shadow-lg shadow-amber-500/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
            ) : (
              'Register Profile'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SurvivorRegistration;
