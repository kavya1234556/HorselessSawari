import DashboardLink from '@/components/dashboradLinks/page';

export interface ILocationType {
  location_name: string;
  location_image: string;
}

const DashboardPage = () => {
  return (
    <div>
      <DashboardLink />
    </div>
  );
};

export default DashboardPage;
