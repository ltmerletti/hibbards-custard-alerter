// "use client";

// import React, { useState, useEffect } from "react";

// interface User {
//   id: string;
//   email: string;
//   whitelist: string[];
//   blacklist: string[];
//   customInstructions: string;
// }

// interface CombinedData {
//   tonightsFlavors: string[];
//   users: User[];
// }

// export default function CombinedDataDisplay() {
//   const [data, setData] = useState<CombinedData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch(
//           "/api/make_jsonData_string_with_users_and_flavors"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         setError("An error occurred while fetching the data.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;
//   if (!data) return <div>No data available.</div>;

//   return (
//     <div>
//       <h1>Combined Data for AI Model</h1>

//       <h2>Tonight&apos;s Flavors</h2>
//       <ul>
//         {data.tonightsFlavors.map((flavor, index) => (
//           <li key={index}>{flavor}</li>
//         ))}
//       </ul>

//       <h2>Users</h2>
//       <ul>
//         {data.users.map((user) => (
//           <li key={user.id}>{user.email}</li>
//         ))}
//       </ul>

//       <h2>Raw JSON Data</h2>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// }
