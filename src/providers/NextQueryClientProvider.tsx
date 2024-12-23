"use client";
import { useState } from "react";
import { client } from "@/client/tanstack";
import { QueryClientProvider } from "@tanstack/react-query";

export default function NextQueryClientProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => client);

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
