"use client";

import dynamicImport from "next/dynamic";

const BuyListClients = dynamicImport(() => import("./BuyListClients"), {
  ssr: false,
});

export default function BuyPage() {
  return <BuyListClients />;
}