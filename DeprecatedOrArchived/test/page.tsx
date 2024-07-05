// "use client";

// import { useState } from "react";

// export default function TestPage() {
//   const [result, setResult] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const triggerEmailProcess = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch("/api/core_service", {
//         method: "POST",
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setResult(JSON.stringify(data, null, 2));
//     } catch (error) {
//       setResult(
//         `Error: ${error instanceof Error ? error.message : String(error)}`
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Email Process Test Page</h1>
//       <button
//         onClick={triggerEmailProcess}
//         disabled={isLoading}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
//       >
//         {isLoading ? "Processing..." : "Trigger Email Process"}
//       </button>
//       {result && (
//         <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
//           {result}
//         </pre>
//       )}
//     </div>
//   );
// }
