import { createFileRoute, redirect } from "@tanstack/react-router";

// Les enseignements et l'ouverture sont sur la landing depuis le lot 1d : redirection vers la section,
// en conservant l'ancre éventuelle (#l-3-x, #ouverture).
export const Route = createFileRoute("/enseignements")({
  beforeLoad: ({ location }) => {
    const hash = location.hash?.replace(/^#/, "") || "enseignements";
    throw redirect({ to: "/", hash, replace: true });
  },
});
