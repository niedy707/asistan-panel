import { NextResponse } from 'next/server';
import { getLocalPatients, syncPatients } from '@/lib/patientService';

export async function GET() {
    let patients = await getLocalPatients();

    // Fallback: If no data, try to sync immediately
    if (patients.length === 0) {
        console.log('No local data found. Triggering immediate sync...');
        const result = await syncPatients();
        if (result.success) {
            patients = await getLocalPatients();
        }
    }

    return NextResponse.json(patients);
}
