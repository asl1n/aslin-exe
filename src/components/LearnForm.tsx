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

  // Validation
  const validate = (name: string, value: string) => {
    let error = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "username" && !value) error = "Username is required";
    if (name === "email" && !emailRegex.test(value)) error = "Invalid email";
    if (name === "password" && value.length < 6) error = "Password too short";

    setErrors((prev: any) => ({ ...prev, [name]: error }));
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate before submit
    Object.keys(formData).forEach((key) =>
      validate(key, (formData as any)[key]),
    );

    alert("Check console for status!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-sm flex flex-col gap-4">
      <div>
        <input
          name="username" // MUST match the key in state
          value={formData.username} // Bind state to value
          onChange={handleChange} // Bind change to state update
          onBlur={handleBlur} // To show error on Blur
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
          onBlur={handleBlur}
          placeholder="Email"
          className={`border p-2 w-full ${errors.email ? "border-red-500" : ""}`}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>

      <div>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter Password"
          className={`border p-2 w-full ${errors.password ? "border-red-500" : ""}`}
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password}</p>
        )}
      </div>

      <button type="submit" className="bg-slate-900 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
}

export default Learn;
