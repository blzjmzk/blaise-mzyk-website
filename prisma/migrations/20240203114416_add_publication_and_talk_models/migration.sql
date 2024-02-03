-- CreateTable
CREATE TABLE "Publication" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "language" VARCHAR(255) NOT NULL,
    "year" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "journalName" VARCHAR(255),
    "journalIssue" VARCHAR(255),
    "bookName" VARCHAR(255),
    "bookEditors" VARCHAR(255),
    "bookPages" VARCHAR(255),
    "doiLink" VARCHAR(255),

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Talk" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "conference" VARCHAR(255) NOT NULL,
    "details" VARCHAR(255) NOT NULL,
    "year" VARCHAR(255) NOT NULL,

    CONSTRAINT "Talk_pkey" PRIMARY KEY ("id")
);
