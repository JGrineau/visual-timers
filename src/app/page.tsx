"use client";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    return (
        <div>
            <h1>Hello Next.js!</h1>
            <button onClick={() => router.push("/pomodoro")}>
                Go to Pomodoro
            </button>
            <button onClick={() => router.push("/linear")}>
                Go to Linear Timer
            </button>
        </div>
    );
}