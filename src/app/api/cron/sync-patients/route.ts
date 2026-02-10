import { NextResponse } from 'next/server';
import { syncPatients } from '@/lib/patientService';

export const dynamic = 'force-dynamic'; // Ensure this runs dynamically

export async function GET(request: Request) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }

    const result = await syncPatients();

    return NextResponse.json(result);
}
