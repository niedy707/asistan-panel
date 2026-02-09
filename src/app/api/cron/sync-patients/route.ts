import { NextResponse } from 'next/server';
import { syncPatients } from '@/lib/patientService';

export const dynamic = 'force-dynamic'; // Ensure this runs dynamically

export async function GET(request: Request) {
    const authHeader = request.headers.get('authorization');
    // In production, you would verify a CRON_SECRET here.
    // For local/MVP, we'll process it.

    const result = await syncPatients();

    return NextResponse.json(result);
}
