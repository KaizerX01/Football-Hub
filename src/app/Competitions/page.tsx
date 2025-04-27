import { CompetitionsGrid } from "@/Components/Competition/CompetitionGrid";

export default function CompetitionsPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Competitions</h1>
      <CompetitionsGrid />
    </div>
  );
}
