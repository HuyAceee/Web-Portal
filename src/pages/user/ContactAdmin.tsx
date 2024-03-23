import { Helmet } from 'react-helmet-async';
import { ContactAdminView } from 'sections/contactAdmin/view';

// ----------------------------------------------------------------------

export default function ContactAdminPage() {
  return (
    <>
      <Helmet>
        <title> Contact Admin | Minimal UI </title>
      </Helmet>

      <ContactAdminView />
    </>
  );
}
