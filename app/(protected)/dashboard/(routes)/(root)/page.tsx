import { BadgeDollarSign, Tent } from "lucide-react";
import InfoCard from "./_components/info-card";


export default function Dashboard() {
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Tent}
          label="Campaign"
          numberOfItems={24}
        />
        <InfoCard
          icon={BadgeDollarSign}
          label="Transaction"
          numberOfItems={12450}
          variant="success"
        />
      </div>
      {/* <CoursesList
        items={[...coursesInProgress, ...completedCourses]}
      /> */}
    </div>
  );
}
