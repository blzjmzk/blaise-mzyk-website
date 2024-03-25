import dynamic from "next/dynamic";

const BookNotesForm = dynamic(
  () => import("@/app/blaise/components/book-notes-form"),
  {
    ssr: false,
  }
);

const NewBookNotePage = () => {
  return (
    <div>
      <h2>Add New Book Note</h2>
      <BookNotesForm />
    </div>
  );
};

export default NewBookNotePage;
