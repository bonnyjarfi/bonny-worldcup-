import { getWorldCupMatches } from "@/lib/api";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const data = await getWorldCupMatches();

  const match = data.matches.find(
    (m: any) => String(m.id) === id
  );

  if (!match) {
    return Response.json(
      { error: "Match not found" },
      { status: 404 }
    );
  }

  return Response.json(match);
}