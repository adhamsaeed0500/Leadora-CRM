import { redirect } from "next/navigation";

/**
 * Root page redirects to the login screen as the default entry point.
 */
export default function Home() {
  redirect("/login");
}
