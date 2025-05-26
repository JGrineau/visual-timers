"use client";
import Pomodoro from "./pomodoro/page";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    return (
        <>
            <h1>Hello Next.js!</h1>
            <button onClick={() => router.push("/pomodoro")}>
                Go to Pomodoro
            </button>
        </>
    );
}