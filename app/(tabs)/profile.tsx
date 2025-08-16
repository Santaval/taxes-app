import ScreenLayout from '@/components/ui/ScreenLayout';
import ProfileInfo from '@/components/profile/ProfileInfo';
import ProfileOptions from '@/components/profile/ProfileOptions';

export default function TabTwoScreen() {
  return (
    <ScreenLayout
    title="Perfil"
    headerContent={<ProfileInfo />}
          contentTitle="Opciones"
  >
    <ProfileOptions />
  </ScreenLayout>
  );
}