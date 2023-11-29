import Container from "../../components/Container";
import LoadingSpinner from "../../components/LoadingSpinner";
import useTests from "../../hooks/tests/useTests";
import SectionHeader from "../shared/SectionHeader";
import TestCard from "./TestCard";

export default function AllTests() {
  const { tests, isPending } = useTests();
  if (isPending) return <LoadingSpinner />;
  console.log(tests);

  return (
    <main className="py-10">
      <SectionHeader title="All Tests" description={<span>Explore our all <span className="text-green-500">services</span></span>} />
      <Container>
        <div className="grid grid-cols-3 gap-8">
          {tests.map((test) => (
            <TestCard test={test} key={test._id} />
          ))}
        </div>
      </Container>
    </main>
  );
}
