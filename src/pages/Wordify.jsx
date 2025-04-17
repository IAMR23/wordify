import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Wordify = () => {
  const [palabras, setPalabras] = useState([]);
  const [index, setIndex] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    chrome.storage.local.get(["user_id"], (data) => {
      const user_id = data.user_id;

      if (!user_id) return;

      const fetchPalabras = async () => {
        setCargando(true);
        try {
          const response = await fetch(
            `http://localhost:8000/palabras/${user_id}`
          );
          if (!response.ok) throw new Error("Error al obtener las palabras");
          let data = await response.json();

          if (!data || data.length === 0) {
            console.log("No hay palabras guardadas.");
            setError("No hay palabras guardadas");
            setCargando(false);
            return;
          }

          data = data.map((p, i) => ({ ...p, numero: i + 1 }));
          setPalabras(data);
          setIndex(data.length - 1);
        } catch (error) {
          console.error("Error al cargar las palabras:", error);
          setError("Error al cargar las palabras");
        } finally {
          setCargando(false);
        }
      };

      fetchPalabras();
    });
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setIndex((prev) => (prev < palabras.length - 1 ? prev + 1 : prev));
  };

  const palabraActual = palabras[index];
  const totalPalabras = palabras.length;

  if (cargando) {
    return (
      <div className="w-[300px] h-[300px] overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando palabras...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[300px] h-[300px] overflow-hidden flex items-center justify-center  bg-red-50 rounded-lg">
        <div className="text-center p-6">
          <p className="text-red-500 font-medium mb-2">{error}</p>
          <p className="text-gray-600">Intenta recargar la página</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    chrome.storage.local.get(["access_token", "user_id"], onStorageReceived);
  };

  const onStorageReceived = (data) => {
    console.log("Antes de eliminar:", data);
    chrome.storage.local.clear(onStorageCleared);
  };

  const onStorageCleared = () => {
    console.log("Sesión cerrada. Datos eliminados.");
    enviarMensajeLogout();
    redirigirAlLogin();
  };

  const enviarMensajeLogout = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "logout" });
      }
    });
  };

  const redirigirAlLogin = () => {
    // Si estás usando React Router, usa navigate("/login")
    navigate("/");
  };

  return (
    <div className="w-[400px] h-[250px] overflow-hidden rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between flex-row">
        <h1 className="text-2xl font-bold text-center text-blue-600 ">
          Wordify
        </h1>
        <button
          className="bg-red-700 text-white rounded-4xl p-2 px-12"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>

      {palabraActual ? (
        <>
          <div className="flex items-center justify-between ">
            <button
              onClick={handlePrev}
              className={`w-12 h-12 rounded-full ${
                index > 0
                  ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              disabled={index === 0}
            >
              <span className="text-xl">←</span>
            </button>

            <div className="bg-gray-100 rounded-lg p-8     m-2">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">
                  {palabraActual.palabra_original}
                </h2>
                <p className="text-xl text-blue-600 font-medium">
                  {palabraActual.palabra_traducida}
                </p>
              </div>
            </div>

            <button
              onClick={handleNext}
              className={` flex items-center justify-center w-12 h-12 rounded-full ${
                index < palabras.length - 1
                  ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              disabled={index === palabras.length - 1}
            >
              <span className="text-xl">→</span>
            </button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-gray-500">
              {index + 1} de {totalPalabras}
            </span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${((index + 1) / totalPalabras) * 100}%` }}
              ></div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No hay palabras disponibles</p>
        </div>
      )}
    </div>
  );
};

export default Wordify;
