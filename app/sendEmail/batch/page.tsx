'use client';

import { useState, FormEvent } from 'react';

export default function SendBatchEmailPage() {
  const [status, setStatus] = useState('');
  const [emails, setEmails] = useState('');
  const [subject, setSubject] = useState('');
  const [html, setHtml] = useState('');

  const handleSendBatchEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const emailArray = emails.split(',').map(email => email.trim());
      console.log('Email array:', emailArray); // Added console.log for the email array
      const response = await fetch("/api/resend/batch", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emails: emailArray, subject, html }),
      });
      if (response.ok) {
        setStatus("Batch emails sent successfully");
        setEmails('');
        setSubject('');
        setHtml('');
      } else {
        setStatus("Failed to send batch emails");
      }
    } catch (error) {
      setStatus("An error occurred while sending the batch emails");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Send Batch Emails</h1>
      <form onSubmit={handleSendBatchEmail} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="emails" className="block text-sm font-medium text-gray-700">To (comma-separated emails):</label>
          <textarea
            id="emails"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            required
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="html" className="block text-sm font-medium text-gray-700">HTML Content:</label>
          <textarea
            id="html"
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            required
            rows={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Send Batch Emails
        </button>
      </form>
      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
}
