"use client";

import dynamic from "next/dynamic";

const SearchClient = dynamic(() => import("components/search/SearchClient"), {
  ssr: false,
});

export default function Search() {
  return <SearchClient />;
}
