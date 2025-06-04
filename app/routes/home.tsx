import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Wordle game" },
    { name: "Wordle game", content: "Welcome to Wordle game!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
