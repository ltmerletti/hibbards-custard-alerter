// 'use client';

// import { useState, FormEvent } from 'react';

// export default function SendEmailPage() {
//   const [status, setStatus] = useState('');
//   const [to, setTo] = useState('');
//   const [subject, setSubject] = useState('');
//   const [text, setText] = useState('');

//   const handleSendEmail = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setStatus('Sending...');
//     try {
//       const response = await fetch("/api/email", {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ to, subject, text }),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setStatus(data.message);
//         setTo('');
//         setSubject('');
//         setText('');
//       } else {
//         const data = await response.json();
//         setStatus(data.error || "Failed to send email");
//       }
//     } catch (error) {
//       console.error("Error sending email:", error);
//       setStatus("An error occurred while sending the email");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Send Email</h1>
//       <form onSubmit={handleSendEmail} className="w-full max-w-md">
//         <div className="mb-4">
//           <label htmlFor="to" className="block text-sm font-medium text-gray-700">To:</label>
//           <input
//             type="email"
//             id="to"
//             value={to}
//             onChange={(e) => setTo(e.target.value)}
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject:</label>
//           <input
//             type="text"
//             id="subject"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="text" className="block text-sm font-medium text-gray-700">Message:</label>
//           <textarea
//             id="text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             required
//             rows={4}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//           ></textarea>
//         </div>
//         <button
//           type="submit"
//           className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//         >
//           Send Email
//         </button>
//       </form>
//       {status && <p className="mt-4 text-sm">{status}</p>}
//     </div>
//   );
// }
