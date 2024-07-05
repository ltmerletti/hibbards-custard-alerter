import { signOut } from "app/auth";
import { deleteUser as dbDeleteUser } from "../db";

async function deleteUser(email: string) {
  console.log(`Deleting user with email: ${email}`);
  await dbDeleteUser(email);
}

export default async function DeleteAccount({
  email,
}: Readonly<{ email: string }>) {
  async function handleDelete() {
    "use server";
    console.log("handleDelete hit");
    try {
      await deleteUser(email);
      console.log("User deleted successfully");
      await signOut();
    } catch (error) {
      if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
        console.log("Redirecting after sign out...");
        throw error;
      } else {
        console.error("Failed to delete account:", error);
      }
    }
  }

  return (
    <form action={handleDelete}>
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
      >
        Delete Account
      </button>
    </form>
  );
}
