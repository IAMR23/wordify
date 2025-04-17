import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      fetch(
        "http://127.0.0.1:8000/login?username=" +
          formData.username +
          "&password=" +
          formData.password,
        {
          method: "POST",
          headers: { accept: "application/json" },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            // Guardar credenciales en chrome.storage.local
            chrome.storage.local.set(
              {
                access_token: data.access_token,
                user_id: data.user_id,
              },
              function () {
                console.log("Usuario autenticado. Redirigiendo...");

                // Enviar un mensaje a content.js para notificar que el usuario está autenticado
                chrome.tabs.query(
                  { active: true, currentWindow: true },
                  function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                      action: "login",
                      access_token: data.access_token,
                      user_id: data.user_id,
                    });
                  }
                );

                navigate("/wordify");
              }
            );
          } else {
            alert("Error al iniciar sesión. Verifica tus credenciales.");
          }
        })
        .catch((error) => {
          console.error("Error al hacer el login:", error);
        });

      navigate("/wordify");
    } catch (error) {
      console.error("Error al hacer el login:", error);
      alert("Ocurrió un error al conectar con el servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[400px] h-[600px] overflow-hidden flex min-h-screen items-center justify-center bg-gray-900 px-4 py-12">
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

          {/* Register link */}
          <div className="flex items-center justify-center">
            <p className="text-center text-sm text-gray-400">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/register"
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
