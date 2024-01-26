import React from "react";
import Header from "../_components/header";
import SectionHeading from "../_components/section-heading";
import { Metadata } from "next";

const PhilosophyPage = () => {
  return (
    <>
      <Header>Philosophy</Header>
      <SectionHeading>My Publications</SectionHeading>
      <SectionHeading>My Talks</SectionHeading>
      <SectionHeading>See Also My Profiles at:</SectionHeading>
      <div>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Donec quam felis,
        ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
        quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
        arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
        Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
        dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend
      </div>
    </>
  );
};
export const metadata: Metadata = {
  title: "Blaise Mzyk | Philosophy",
  description: "Blaise Mzyk philosophy page ",
};

export default PhilosophyPage;
