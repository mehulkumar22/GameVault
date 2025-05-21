import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from URL query params
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect') || '/';
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast.success('Login successful!');
        // Redirect to the specified path or homepage
        navigate(`/${redirectTo}`);
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // For demo purposes, provide login credentials
  const loginAsAdmin = () => {
    setEmail('admin@example.com');
    setPassword('password');
  };

  const loginAsUser = () => {
    setEmail('user@example.com');
    setPassword('password');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center">
      <div className="mx-auto w-full max-w-md p-6">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-white">
            <Gamepad2 className="h-8 w-8 text-purple-500" />
            <span>GameVault</span>
          </Link>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Login to Your Account
          </h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-md text-sm text-red-200">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              fullWidth
            />
            
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              fullWidth
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-400">
                  Remember me
                </label>
              </div>
              
              <a href="#" className="text-sm text-purple-500 hover:text-purple-400">
                Forgot password?
              </a>
            </div>
            
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
            >
              Login
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-purple-500 hover:text-purple-400 font-medium">
                Sign up
              </Link>
            </p>
          </div>
          
          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-center text-sm text-slate-400 mb-4">
              Demo Credentials
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loginAsUser}
              >
                Login as User
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loginAsAdmin}
              >
                Login as Admin
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-slate-400 hover:text-white">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;