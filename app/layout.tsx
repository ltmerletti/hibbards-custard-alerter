import "./globals.css";

let title = "Hibbard's Custard Notifier";
let description =
  "This is a custard notifier webapp made to notify you whenever a flavor you're interested in at Hibbard's comes up.";

export const metadata = {
  title,
  description,
  metadataBase: new URL("https://hibbards-custard-alerter.vercel.app/"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-light from-custom-light-from to-custom-light-to dark:bg-gradient-dark dark:from-custom-dark-from dark:to-custom-dark-to min-h-screen">
        {children}
      </body>
    </html>
  );
}
