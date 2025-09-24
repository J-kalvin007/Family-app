"use client";

import { useState } from "react";
import { X } from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";
// import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { log } from "console";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsloading(true);

    try {
      const response = await fetch("/api/abonne", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Inscription réussie ");
        setEmail("");
      } else {
        console.log("VOICI ERROR" ,data.error)
        toast.error(data.error || "Une erreur est survenue, veuillez réessayer !");
      }

    } catch (error) {
      toast.error("Une erreur est survenue, veuillez réessayer et regarde la console");
      console.error("Erreur API Mailchimp :", error);
    }

    setIsloading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-900 px-4">

      <ToastContainer position="top-center" autoClose={3000} closeOnClick pauseOnHover draggable hideProgressBar />

      <div className="flex flex-col items-center w-full max-w-lg shadow-2xl rounded-2xl border border-amber-500 p-6 bg-slate-800">
        <h1 className="text-3xl font-bold text-white mb-4">Bienvenue TAKOUDJOU</h1>
        <p className="text-white mb-6">
          Inscris-toi maintenant pour ne plus jamais manquer ton rendez-vous sacré avec ta famille et le Très-Haut.
        </p>

        {!isLoading ? (
          <form className="flex w-full" onSubmit={handleSubmit}>
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Entrer votre e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-10 px-4 rounded-lg outline-none border border-transparent focus:border-amber-500 text-slate-900 bg-amber-50 font-bold"
              />
              <X
                className="absolute right-2 top-1/2 transform h-5 w-5 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-900"
                onClick={() => setEmail("")}
              />
            </div>
            <button
              type="submit"
              className="ml-2 bg-amber-300 text-black font-semibold px-4 rounded-lg hover:scale-105 transition-transform cursor-pointer"
            >
              Valider
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center">
            {/* <ClipLoader color="#f59e0b" loading size={50} /> */}
            <p className="text-white mt-2">Chargement...⌛</p>
          </div>
        )}
      </div>
    </div>
  );
}
