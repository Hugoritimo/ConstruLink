"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const BackButton: React.FC = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition duration-300"
    >
      Voltar
    </Button>
  );
};

export default BackButton;
