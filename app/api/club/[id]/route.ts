import { HEMARatingsGetClub } from "@/lib/HEMARatingsAPI"

export async function GET(_request: Request, { params }: { params: { id: string } }): Promise<Response> {
    const response = await HEMARatingsGetClub(params.id)
    return Response.json(response)
}