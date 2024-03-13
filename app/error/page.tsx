import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ErrorComponent: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Error</h2>
        <p className="text-gray-800">Lo sentimos, se ha producido un error.</p>
        <p className="text-gray-800">
          Por favor, inténtalo de nuevo más tarde.
        </p>
        <Button>
          <Link href="/">Ir al inicio</Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorComponent;
