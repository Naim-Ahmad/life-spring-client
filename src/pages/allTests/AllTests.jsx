import LoadingSpinner from "../../components/LoadingSpinner";
import useTests from "../../hooks/tests/useTests";
import TestCard from "./TestCard";

export default function AllTests() {
  const { tests, isPending } = useTests();
  if (isPending) return <LoadingSpinner />;
  console.log(tests);

  return (
    <div>
      <h1>All TEst</h1>
      <div className="grid grid-cols-3 gap-6">
        {tests.map((test) => (
          <TestCard test={test} key={test._id} />
        ))}
      </div>
    </div>
  );
}
