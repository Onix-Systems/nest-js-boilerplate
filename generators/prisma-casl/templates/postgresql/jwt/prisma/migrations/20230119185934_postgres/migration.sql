-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "password" VARCHAR(64) NOT NULL DEFAULT '',
    "email" VARCHAR(64) NOT NULL DEFAULT '',
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL DEFAULT '',

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "userEntityId" INTEGER NOT NULL,
    "roleEntityId" INTEGER NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("userEntityId","roleEntityId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_name_key" ON "user_roles"("name");

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_userEntityId_fkey" FOREIGN KEY ("userEntityId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_roleEntityId_fkey" FOREIGN KEY ("roleEntityId") REFERENCES "user_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
