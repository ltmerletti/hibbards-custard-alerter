import Link from "next/link";
import Footer from "@/components/footer";
import NavBar from "@/components/NavBar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
      <NavBar />
      <main className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden m-4">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              About Hibbard&apos;s Frozen Custard Tracker
            </h1>
            <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
              <p>
                Welcome to Hibbard&apos;s Frozen Custard Tracker, a passion
                project born out of a love for delicious frozen custard and a
                desire for a more personalized dessert experience using AI.
              </p>
              <p>
                As a frozen custard enthusiast, I often found myself wondering
                when my favorite flavors would be available at Hibbard&apos;s.
                That&apos;s when the idea struck: why not create a tool to keep
                track of my favorite flavors and get notified when something
                exciting is on the menu?
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg mt-8 mb-8">
                <p className="mb-4">This application allows you to:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>
                    Keep a record of your favorite Hibbard&apos;s frozen custard
                    flavors
                  </li>
                  <li>
                    Receive notifications when flavors you&apos;re interested in
                    become available
                  </li>
                  <li>Discover new and seasonal flavors</li>
                  <li>Never miss out on your favorite custards!</li>
                </ul>
              </div>
              <p>
                I ({" "}
                <a
                  href="https://github.com/SpecialistSteak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  SpecialistSteak
                </a>)
                developed this project out of my love for coding and
                Hibbard&apos;s incredible frozen custard.
              </p>
              <p>
                I hope that this tool enhances your Hibbard&apos;s experience
                and helps you enjoy your favorite flavors more often!
              </p>
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/"
                className="px-6 py-3 text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}