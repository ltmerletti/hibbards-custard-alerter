import { auth, signOut } from "app/auth";
import Link from "next/link";

export default async function ProtectedPage() {
  let session = await auth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Account
          </h2>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            You are logged in as
          </p>
          <p className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
            {session?.user?.email}
          </p>
        </div>
        <SignOut />
        <div className="text-center">
          <Link
            href="/"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
      >
        Sign out
      </button>
    </form>
  );
}
