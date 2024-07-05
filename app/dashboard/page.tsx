import { auth } from "app/auth";
import {
  getWhitelist,
  getBlacklist,
  setWhitelist,
  setBlacklist,
  getCustomInstructions,
  setCustomInstructions,
} from "app/db";
import Link from "next/link";
import TagList from "./TagList";
import CustomInstructions from "./CustomInstructions";
import Footer from "@/components/footer";
import ThemeToggle from "./ThemeToggle";

const updateWhitelist = async (...args: Parameters<typeof setWhitelist>) => {
  "use server";
  return setWhitelist(...args);
};

const updateBlacklist = async (...args: Parameters<typeof setBlacklist>) => {
  "use server";
  return setBlacklist(...args);
};

const updateCustomInstructions = async (
  ...args: Parameters<typeof setCustomInstructions>
) => {
  "use server";
  return setCustomInstructions(...args);
};

export default async function DashboardPage() {
  const session = await auth();
  const email = session?.user?.email as string;

  const whitelist = await getWhitelist(email);
  const blacklist = await getBlacklist(email);
  const customInstructions = await getCustomInstructions(email);

  return (
    <div className="min-h-screen bg-gradient-light from-custom-light-from to-custom-light-to dark:bg-gradient-dark dark:from-custom-dark-from dark:to-custom-dark-to text-gray-900">
      <header className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-white">
            Hibbard&apos;s Custard
          </Link>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link
              href="/protected"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Account
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Flavor Preferences
            </h1>
            <div className="space-y-6">
              <TagList
                title="Favorite Flavors"
                tags={whitelist}
                email={email}
                updateTags={updateWhitelist}
                className="bg-gray-50 dark:bg-gray-700"
              />
              <TagList
                title="Flavors to Avoid"
                tags={blacklist}
                email={email}
                updateTags={updateBlacklist}
                className="bg-gray-50 dark:bg-gray-700"
              />
              <CustomInstructions
                instructions={customInstructions}
                email={email}
                updateInstructions={updateCustomInstructions}
                className="bg-gray-50 dark:bg-gray-700"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
