# 트리플 백엔드 과제

## DDL

```sql
CREATE TABLE `point` (
  `id` varchar(36) NOT NULL,
  `review_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `point` int NOT NULL,
  INDEX `idx_review_id` (`review_id`),
  INDEX `idx_user_id` (`user_id`),
  PRIMARY KEY (`id`));
```

## 실행 방법

### Server Application

1. `.env` 파일을 생성하고 `.env-example`의 형식에 맞추고, 데이터를 입력합니다.
2. 데이터베이스에 `triple`이라는 이름으로 데이터베이스를 생성합니다.
3. 터미널에 `npm install` 명령어를 실행합니다.
4. `npm run start:dev` 혹은 `npm run start` 명령어를 이용해 서버를 실행시킵니다.
