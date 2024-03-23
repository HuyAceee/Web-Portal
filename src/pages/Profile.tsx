import { Helmet } from "react-helmet-async";
import { ProfileView } from "sections/account/view";

export default function ProfilePage(): React.JSX.Element {
  return (
    <>
      <Helmet>
        <title> Profile | Minimal UI </title>
      </Helmet>

      <ProfileView />
    </>
  );
}
