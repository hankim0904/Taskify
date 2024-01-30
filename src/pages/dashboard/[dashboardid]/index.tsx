import DashboardLayout from "@/components/domains/dashboardid/DashboardLayout";
import ColumnList from "@/components/domains/dashboardid/ColumnList";
import AddColumn from "@/components/domains/dashboardid/AddColumn";
import BaseContainer from "@/components/commons/BaseContainer/BaseContainer";

export default function DashboardPage() {
  return (
    <BaseContainer currentPath="test">
      <DashboardLayout columnList={<ColumnList />} addColumn={<AddColumn />} />
    </BaseContainer>
  );
}
