#!/bin/bash

npx prisma migrate dev --schema=prisma/main/schema.prisma
npx prisma generate --schema=prisma/sgu/schema.prisma
npx prisma generate --schema=prisma/bi/schema.prisma