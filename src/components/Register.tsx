import { useState, type ReactElement } from "react";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

function Register(): ReactElement {
  // Form Declare
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Logic States
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Validation Logic
  const validate = (name: string, value: string) => {
    let error = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (name === "username" && !value) error = "Username is required";
    if (name === "email" && !emailRegex.test(value))
      error = "Invalid email address";
    if (name === "password") {
      if (!value) {
        error = "Password is required";
      } else if (!passRegex.test(value)) {
        error =
          "Must be 8+ chars with uppercase, lowercase, number, and symbol";
      }
    }

    setErrors((prev: any) => ({ ...prev, [name]: error }));
    return error;
  };

  // Binding with html
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Real time error push
    if (errors[name]) {
      validate(name, value);
    }
  };

  // when user is moving to next field
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validate(name, value);
  };

  // Submit Logic
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate everything before submit
    let isFormValid = true;
    Object.keys(formData).forEach((key) => {
      const error = validate(key, (formData as any)[key]);
      if (error) isFormValid = false;
    });

    if (!isFormValid) {
      toast.error("Please enter proper data");
      return;
    }

    setIsLoading(true);

    // Simulate API Call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created! Check console for payload");
      console.log("Register Payload:", formData);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4 relative font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Register
          </h1>
          <p className="text-slate-500 mt-2">
            Create an account to get started
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1 ml-1">
              Username
            </label>
            <input
              name="username" // MUST match the key in state
              type="text"
              disabled={isLoading}
              value={formData.username} // Bind state to value
              onChange={handleChange} // Bind change to state update
              onBlur={handleBlur} // To show error on Blur
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all disabled:bg-slate-50 ${
                errors.username
                  ? "border-red-500 ring-2 ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }`}
              placeholder="Pick a username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                {errors.username}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1 ml-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              disabled={isLoading}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all disabled:bg-slate-50 ${
                errors.email
                  ? "border-red-500 ring-2 ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }`}
              placeholder="name@company.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1 ml-1">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                disabled={isLoading}
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all disabled:bg-slate-50 ${
                  errors.password
                    ? "border-red-500 ring-2 ring-red-100"
                    : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                {errors.password}
              </p>
            )}
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-bold transition-all"
            >
              Sign In
            </Link>
          </p>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 cursor-pointer flex items-center justify-center gap-2 transform active:scale-[0.98] transition-all shadow-lg mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus size={20} />
                Register
              </>
            )}
          </button>
        </form>
      </div>

      <div className="absolute bottom-6 text-center text-sm text-slate-500 font-medium">
        Developed by{" "}
        <a
          href="https://asl1n.github.io/Portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 transition-all font-bold"
        >
          Aslin Karmacharya
        </a>
      </div>
    </div>
  );
}

export default Register;
