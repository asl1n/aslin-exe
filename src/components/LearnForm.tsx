import { useState, type ReactElement } from "react";

function Learn(): ReactElement {
  // Form Declare
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    address: "",
  });

  // To set errors
  const [errors, setErrors] = useState<any>({});

  // validation
  const validate = () => {
    let newErrors: any = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username) newErrors.username = "Username is required";
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email";
    if (formData.password.length < 6) newErrors.password = "Password too short";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Binding with html
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Payload ready:", formData);
      alert("Success!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-sm flex flex-col gap-4">
      <div>
        <input
          name="username" // MUST match the key in state
          value={formData.username} // Bind state to value
          onChange={handleChange} // Bind change to state update
          placeholder="Username"
          className={`border p-2 w-full ${errors.username ? "border-red-500" : ""}`}
        />
        {errors.username && (
          <p className="text-red-500 text-xs">{errors.username}</p>
        )}
      </div>

      <div>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className={`border p-2 w-full ${errors.email ? "border-red-500" : ""}`}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>

      <div>
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Password"
          className={`border p-2 w-full ${errors.email ? "border-red-500" : ""}`}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>

      <button type="submit" className="bg-slate-900 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
}

export default Learn;
