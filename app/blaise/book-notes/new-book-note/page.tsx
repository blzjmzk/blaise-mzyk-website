import dynamic from "next/dynamic";

const BookNotesForm = dynamic(
  () => import("@/app/blaise/_components/book-notes-form/BookNotesForm"),
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
