import { Metadata } from "next";
import Header from "../components/header";
import ContactForm from "./ContactForm";

const ContactPage = () => {
  return (
    <>
      <Header>Contact</Header>
      <ContactForm />
    </>
  );
};

export const metadata: Metadata = {
  title: "Blaise Mzyk | Contact",
  description: "Blaise Mzyk contact page ",
};

export default ContactPage;
