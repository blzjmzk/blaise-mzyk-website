-- CreateTable
CREATE TABLE "BookNote" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "year" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "significantThoughts" TEXT NOT NULL,
    "thoughts" TEXT NOT NULL,

    CONSTRAINT "BookNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookNote_slug_key" ON "BookNote"("slug");
