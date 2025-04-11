import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "El nombre de usuario es requerido";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Login attempted:", formData);
      setIsSubmitting(false);
      setLoginSuccess(true);

      // Reset form after successful login
      setTimeout(() => {
        setFormData({
          username: "",
          password: "",
        });
        setLoginSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-400">Wordify</h1>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Iniciar sesión
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 bg-gray-800 p-8 rounded-lg shadow-lg"
        >
          {/* Username field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Nombre de usuario
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className={`block w-full rounded-md border-0 py-2 px-3 bg-gray-700 text-white shadow-sm ring-1 ring-inset 
                  ${errors.username ? "ring-red-500" : "ring-gray-600"} 
                  focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">{errors.username}</p>
              )}
            </div>
          </div>

          {/* Password field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Contraseña
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`block w-full rounded-md border-0 py-2 px-3 bg-gray-700 text-white shadow-sm ring-1 ring-inset 
                  ${errors.password ? "ring-red-500" : "ring-gray-600"} 
                  focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="mt-2 text-right">
              <Link
                href="#"
                className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white
                ${
                  isSubmitting
                    ? "bg-indigo-400"
                    : "bg-indigo-600 hover:bg-indigo-500"
                } 
                focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}
            >
              {isSubmitting ? "Procesando..." : "Iniciar sesión"}
            </button>
          </div>

          {/* Success message */}
          {loginSuccess && (
            <div className="rounded-md bg-green-700 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  {/* Checkmark icon */}
                  <svg
                    className="h-5 w-5 text-green-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-300">
                    ¡Inicio de sesión exitoso!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Register link */}
          <div className="flex items-center justify-center">
            <p className="text-center text-sm text-gray-400">
              ¿No tienes una cuenta?{" "}
              <Link
                href="#"
                className="font-medium text-indigo-400 hover:text-indigo-300"
              >
                Regístrate
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
