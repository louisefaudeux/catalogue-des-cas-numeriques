import { createFileRoute, redirect } from "@tanstack/react-router";

// La page « Comment lire » et le lexique ont été retirés (lot 1) : redirection permanente vers l'accueil.
export const Route = createFileRoute("/comment-lire")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
});
