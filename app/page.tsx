// "use client";

// import { useState } from "react";
// import { X } from 'lucide-react';
// import { toast, ToastContainer } from "react-toastify";
// // import { ClipLoader } from "react-spinners";
// import "react-toastify/dist/ReactToastify.css";


// export default function Home() {
//   const [email, setEmail] = useState("");
//   const [isLoading, setIsloading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsloading(true);

//     try {
//       const response = await fetch("/api/abonne", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success("Inscription réussie ");
//         setEmail("");
//       } else {
//         console.log("VOICI ERROR" ,data.error)
//         toast.error(data.error || "Une erreur est survenue, veuillez réessayer !");
//       }

//     } catch (error) {
//       toast.error("Une erreur est survenue, veuillez réessayer et regarde la console");
//       console.error("Erreur API Mailchimp :", error);
//     }

//     setIsloading(false);
//   };

//   return (
//     <div className="flex flex-col justify-center items-center h-screen bg-slate-900 px-4">

//       <ToastContainer position="top-center" autoClose={3000} closeOnClick pauseOnHover draggable hideProgressBar />

//       <div className="flex flex-col items-center w-full max-w-lg shadow-2xl rounded-2xl border border-amber-500 p-6 bg-slate-800">
//         <h1 className="text-3xl font-bold text-white mb-4">Bienvenue TAKOUDJOU</h1>
//         <p className="text-white mb-6">
//           Inscris-toi maintenant pour ne plus jamais manquer ton rendez-vous sacré avec ta famille et le Très-Haut.
//         </p>

//         {!isLoading ? (
//           <form className="flex w-full" onSubmit={handleSubmit}>
//             <div className="relative flex-1">
//               <input
//                 type="email"
//                 placeholder="Entrer votre e-mail"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full h-10 px-4 rounded-lg outline-none border border-transparent focus:border-amber-500 text-slate-900 bg-amber-50 font-bold"
//               />
//               <X
//                 className="absolute right-2 top-1/2 transform h-5 w-5 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-900"
//                 onClick={() => setEmail("")}
//               />
//             </div>
//             <button
//               type="submit"
//               className="ml-2 bg-amber-300 text-black font-semibold px-4 rounded-lg hover:scale-105 transition-transform cursor-pointer"
//             >
//               Valider
//             </button>
//           </form>
//         ) : (
//           <div className="flex flex-col items-center">
//             {/* <ClipLoader color="#f59e0b" loading size={50} /> */}
//             <p className="text-white mt-2">Chargement...⌛</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }















"use client"

import { useState } from "react";
import { X } from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";
import Confetti from 'react-confetti';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import useWindowSize from 'react-use/lib/useWindowSize';

export default function Home() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsloading(true);

    try {
      const response = await fetch("/api/abonne", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if(response.ok){
        toast.success("Inscription réussie ✅");
        setEmail("");
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      } else {
        const data = await response.json();
        toast.error(data.error || "Une erreur est survenue, veuillez réessayer !");
      }

    } catch (error) {
      toast.error("Une erreur est survenue, veuillez réessayer !");
      console.log(`Erreur API Mailchimp: ${error}`);
    }

    setIsloading(false);
  }

  const particlesInit: NonNullable<React.ComponentProps<typeof Particles>['init']> = async (main) => {
    await loadFull(main as unknown as Parameters<typeof loadFull>[0]);
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-slate-300 via-blue-400 to-indigo-500 p-4 overflow-hidden">

      {/* Particules derrière la carte */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 50 },
            color: { value: ["#fcd34d","#f87171","#a78bfa"] },
            shape: { type: "circle" },
            opacity: { value: 0.8 },
            size: { value: { min: 2, max: 6 } },
            move: { enable: true, speed: 1, direction: "top", outModes: "out" }
          }
        }}
        style={{ position: "absolute", top: 0, left: 0, width, height, zIndex: 0 }}
      />

      {showConfetti && <Confetti width={width} height={height} recycle={false} gravity={0.2} numberOfPieces={250} />}

      <ToastContainer position="top-center" autoClose={3000} closeOnClick pauseOnHover draggable />

      {/* Carte centrale */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl max-w-lg w-full p-8 md:p-12 flex flex-col items-center transform transition-transform duration-500 hover:scale-105">

        {/* Texte flottant */}
        <div className="mb-6 text-center animate-fadeIn float-animation">
          <h1 className="text-3xl md:text-5xl font-extrabold text-amber-600 drop-shadow-lg">Bienvenue TAKOUDJOU</h1>
          <p className="mt-2 text-lg md:text-2xl font-semibold text-gray-700">Inscris-toi maintenant !</p>
          <p className="mt-4 text-sm md:text-base text-gray-600">
            Ne manque plus jamais ton rendez-vous sacré avec ta famille et le Très-Haut.
          </p>
        </div>

        {/* Formulaire */}
        {!isLoading ? (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 animate-fadeInUp">

            <div className="relative w-full">
              <input
                type="email"
                placeholder="Entrer votre e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" h-10 p-5 input input-bordered w-full pr-10 rounded-xl border-2 border-amber-500 focus:border-amber-600 focus:ring-amber-300 shadow-lg bg-white transition-all duration-300 hover:shadow-2xl"
                required
              />
              <X
                className="w-5 h-5 cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setEmail("")}
              />
            </div>

            <button
              type="submit"
              className="btn btn-amber w- py-2 rounded-xl text-white font-bold text-lg transform transition duration-300 hover:shadow-xl animate-pulse-on-success bg-amber-900 cursor-pointer"
            >
              Valider
            </button>

          </form>

        ) : (

          <div className="w-full flex flex-col items-center gap-4">

            <p className="text-gray-700 font-semibold animate-pulse">Chargement...</p>
            <ClipLoader color="#f59e0b" loading={true} size={50} />
            
          </div>
        )}
      </div>
    </div>
  );
}
