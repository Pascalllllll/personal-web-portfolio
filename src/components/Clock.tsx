import { useState, useEffect } from 'react';

// Fungsi helper untuk memformat jam (misal: 03:02)
const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    hours = hours % 12;
    hours = hours ? hours : 12; // Jam '0' harus menjadi '12'
    const hoursString = hours.toString().padStart(2, '0');

    return `${hoursString}:${minutes}`;
};

// Fungsi helper untuk memformat tanggal (misal: November 11)
const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
    });
};

export const Clock = () => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        // Set interval untuk update jam setiap detik
        const intervalId = setInterval(() => {
            setNow(new Date());
        }, 1000);

        // Hentikan interval saat komponen dibongkar
        return () => clearInterval(intervalId);
    }, []);

    const timeString = formatTime(now);
    const dateString = formatDate(now);
    const ampm = now.getHours() >= 12 ? 'pm' : 'am';

    return (
        <div className="flex items-center gap-2 text-foreground">
            {/* Bagian Jam (03:02) */}
            <span className="text-4xl font-bold">{timeString}</span>

            {/* Bagian AM/PM & Tanggal */}
            <div className="flex flex-col items-start leading-none">
                <span className="text-sm font-medium">{ampm}</span>
                <span className="text-sm text-muted-foreground">{dateString}</span>
            </div>
        </div>
    );
};