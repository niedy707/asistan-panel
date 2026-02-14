import fs from 'fs';
import path from 'path';

export default function BuildTimestamp() {
    try {
        const packagePath = path.join(process.cwd(), 'package.json');
        const stats = fs.statSync(packagePath);
        const mtime = stats.mtime;

        const yy = String(mtime.getFullYear()).slice(-2);
        const mm = String(mtime.getMonth() + 1).padStart(2, '0');
        const dd = String(mtime.getDate()).padStart(2, '0');
        const hh = String(mtime.getHours()).padStart(2, '0');
        const min = String(mtime.getMinutes()).padStart(2, '0');

        const formattedDate = `${yy}-${mm}${dd} ${hh}${min}`;

        return (
            <div className="fixed bottom-2 right-2 text-[10px] text-slate-400 font-mono select-none pointer-events-none z-[9999] opacity-70">
                Up-to-date: {formattedDate}
            </div>
        );
    } catch (error) {
        console.error("Error getting build timestamp:", error);
        return null;
    }
}
