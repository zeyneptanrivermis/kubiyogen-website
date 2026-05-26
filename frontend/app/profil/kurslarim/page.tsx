import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { UserDataList } from "@/components/user-data-list";

export default function MyCoursesPage() {
  return (
    <main>
      <PageHero title="Kurslarim" description="Satinalinan dijital egitimlere kodlu ve sureli erisim." />
      <section className="py-16">
        <Container>
          <UserDataList title="Kurslarim" path="/users/courses" />
        </Container>
      </section>
    </main>
  );
}
