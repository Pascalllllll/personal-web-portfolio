import { useState, useRef, useEffect } from "react";
import { Music, Pause, ListMusic } from "lucide-react";

// --- DAFTAR LAGU ANDA ---
// ❗ Ganti judul dan nama file.
// ❗ Pastikan semua file ini ada di folder /public/music/
const SONG_LIST = [
    { title: "ACELERADA", src: "/music/song1.mp3" },
    { title: "Montagem Rugada", src: "/music/song2.mp3" },
    { title: "DIA DELICIA", src: "/music/song3.mp3" },
    { title: "Montagem Xonada", src: "/music/song4.mp3" },
    { title: "MENTE MÁ", src: "/music/song5.mp3" },
];
// -------------------------

export const MusicToggle = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleSongSelect = (index: number) => {
        setCurrentSongIndex(index);
    };

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
            audioRef.current.play().catch(e => console.error("Autoplay gagal:", e));
            setIsPlaying(true);
        }
    }, [currentSongIndex]);

    const playNextSong = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % SONG_LIST.length);
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Tombol Play/Pause Utama */}
            <button
                type="button"
                onClick={toggleMusic}
                // 💡 Tambahkan background solid agar terlihat di atas konten
                className="text-muted-foreground hover:text-foreground transition-colors 
                   p-2 rounded-full bg-background/50 backdrop-blur-sm"
                aria-label={isPlaying ? "Pause music" : "Play music"}
            >
                {isPlaying ? <Pause size={20} /> : <Music size={20} />}
            </button>

            {/* 💡 Playlist (CSS DIUBAH AGAR POP-UP) */}
            {isHovering && (
                <div
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-0 w-56 z-50
                     bg-popover text-popover-foreground 
                     border rounded-md shadow-lg p-2"
                /* 💡 Diubah agar muncul di atas dan di tengah */
                >
                    {/* Header Playlist (tidak berubah) */}
                    <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b">
                        <h4 className="font-semibold text-sm">Daftar Putar</h4>
                        <ListMusic size={16} className="text-muted-foreground" />
                    </div>

                    {/* Daftar Lagu (tidak berubah) */}
                    <div className="flex flex-col gap-1">
                        {SONG_LIST.map((song, index) => (
                            <button
                                key={song.src}
                                onClick={() => handleSongSelect(index)}
                                className={`
                  w-full text-left px-2 py-1.5 text-sm rounded 
                  hover:bg-accent hover:text-accent-foreground 
                  truncate transition-colors
                  ${index === currentSongIndex
                                        ? 'font-bold text-primary'
                                        : 'text-muted-foreground'
                                    }
                `}
                            >
                                {index + 1}. {song.title}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Elemen Audio (tidak berubah) */}
            <audio
                ref={audioRef}
                src={SONG_LIST[currentSongIndex].src}
                onEnded={playNextSong}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
            />
        </div>
    );
};