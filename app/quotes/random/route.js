import { NextResponse } from 'next/server';
import data from 'data/ders.json';

export const dynamic = 'force-dynamic';

export async function GET() {
    // Bugünün tarihini al
    const today = new Date();
    // Günü ve ayı iki haneli olacak şekilde ayarla (örn: 5 -> 05)
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Aylar 0'dan başladığı için 1 ekle
    const year = today.getFullYear();
    
    // JSON dosyasındaki tarih formatına uygun hale getir (örn: 01.09.2025)
    const formattedDate = `${day}.${month}.${year}`;

    // Bugüne ait dersleri filtrele
    const todaysSchedule = data.filter(item => item['TARİH'].trim() === formattedDate);
    
    // Bugünün ders programını JSON formatında döndür
    return NextResponse.json({
        date: formattedDate,
        schedule: todaysSchedule,
        dataSource: 'Local JSON file'
    });
}
