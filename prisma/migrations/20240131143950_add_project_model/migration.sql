-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "type" VARCHAR(30) NOT NULL,
    "description" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
