# ===== Stage 1: Build =====
FROM node:20-alpine AS builder

WORKDIR /app

# نسخ ملفات الـ package أولاً للاستفادة من Docker cache
COPY package*.json ./
COPY prisma ./prisma/

# تثبيت الحزم وتوليد Prisma client
RUN npm ci
RUN npx prisma generate

# نسخ باقي الكود وبناء المشروع
COPY . .
RUN npm run build

# ===== Stage 2: Production =====
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# نسخ ملفات الـ package (production dependencies فقط)
COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --omit=dev
RUN npx prisma generate

# نسخ ملفات البناء من الـ builder stage
COPY --from=builder /app/dist ./dist

# مجلد الـ uploads
RUN mkdir -p uploads

EXPOSE 4000

CMD ["node", "dist/main"]
