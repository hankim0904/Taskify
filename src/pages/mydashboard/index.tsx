import MydashboardLayout from "@/components/domains/mydashboard/MydashboardLayout";
import DashboardList from "@/components/domains/mydashboard/DashboardList";
import InvitedDashboardList from "@/components/domains/mydashboard/InvitationList";
import BaseContainer from "@/components/commons/BaseContainer/BaseContainer";

export default function MydashboardPage() {
  return (
    <BaseContainer currentPath="test">
      <MydashboardLayout dashboardList={<DashboardList />} invitedDashboardList={<InvitedDashboardList />} />
    </BaseContainer>
  );
}
