import Link from "next/link";
import Footer from "@/components/footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-dark from-custom-dark-from to-custom-dark-to text-white">
      <main className="max-w-4xl mx-auto py-28 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden m-4">
          <div className="p-6">
            {" "}
            <h1 className="text-3xl font-bold text-center mb-8 text-white">
              About Hibbard&apos;s Frozen Custard Tracker
            </h1>
            <div className="space-y-6 text-lg text-gray-300">
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
              <p>This application allows you to:</p>
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
              <p>
                Developed by{" "}
                <a
                  href="https://github.com/SpecialistSteak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline"
                >
                  SpecialistSteak
                </a>
                , this project combines my passion for coding with a love for
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
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
