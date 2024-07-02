import Link from "next/link";
import Footer from "@/components/footer";

export default function AboutPage() {
  return (
    <>
      <div className="flex min-h-screen bg-black text-white">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8 text-center">
            About Hibbard&apos;s Frozen Custard Tracker
          </h1>

          <div className="space-y-6 text-lg">
            <p>
              Welcome to Hibbard&apos;s Frozen Custard Tracker, a passion
              project born out of a love for delicious frozen custard and a
              desire for a more personalized dessert experience.
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
              <li>Never miss out on the perfect scoop again!</li>
            </ul>

            <p>
              Developed by{" "}
              <a
                href="https://github.com/SpecialistSteak"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                SpecialistSteak
              </a>
              , this project combines a passion for coding with a love for
              Hibbard&apos;s incredible frozen custard.
            </p>

            <p>
              We hope this tool enhances your Hibbard&apos;s experience and
              helps you indulge in your favorite flavors more often!
            </p>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
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
