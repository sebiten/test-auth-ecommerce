import { cookies } from "next/headers";

export async function GET() {
  console.log(cookies().getAll());
  return new Response("working");
}