import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The page you are looking for does not exist.
        </p>
        <Button onClick={() => router.push("/students")}>
          Go to Students
        </Button>
      </div>
    </div>
  );
}
