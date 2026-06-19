import { getWorldCupMatches } from "@/lib/api";

export async function GET() {
  const data = await getWorldCupMatches();

  return Response.json(data);
}