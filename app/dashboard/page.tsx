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
    <>
      <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">
            Flavor Preferences
          </h1>
          <div className="space-y-8">
            <TagList
              title="Favorite Flavors"
              tags={whitelist}
              email={email}
              updateTags={updateWhitelist}
              className="bg-green-900/20"
            />
            <TagList
              title="Flavors to Avoid"
              tags={blacklist}
              email={email}
              updateTags={updateBlacklist}
              className="bg-red-900/20"
            />
            <CustomInstructions
              instructions={customInstructions}
              email={email}
              updateInstructions={updateCustomInstructions}
              className="bg-blue-900/20"
            />
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
