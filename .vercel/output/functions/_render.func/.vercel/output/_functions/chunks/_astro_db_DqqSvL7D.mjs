import { createRemoteDatabaseClient, asDrizzleTable } from '@astrojs/db/runtime';
import '@astrojs/db/dist/runtime/virtual.js';

const db = await createRemoteDatabaseClient({
  dbType: "libsql",
  remoteUrl: process.env.ASTRO_DB_REMOTE_URL ?? "libsql://ova-project-gitchaell.turso.io",
  appToken: process.env.ASTRO_DB_APP_TOKEN
});
const User = asDrizzleTable("User", { "columns": { "id": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "User", "primaryKey": true } }, "photoUrl": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "photoUrl", "collection": "User", "primaryKey": false, "optional": true } }, "names": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "names", "collection": "User", "primaryKey": false, "optional": false } }, "email": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "email", "collection": "User", "primaryKey": false, "optional": false } }, "passwordHash": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "passwordHash", "collection": "User", "primaryKey": false, "optional": false } }, "school": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "school", "collection": "User", "primaryKey": false, "optional": true } }, "skills": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "skills", "collection": "User", "primaryKey": false, "optional": true } } }, "deprecated": false, "indexes": {} }, false);
const Session = asDrizzleTable("Session", { "columns": { "id": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "Session", "primaryKey": true } }, "expiresAt": { "type": "date", "schema": { "optional": false, "unique": false, "deprecated": false, "name": "expiresAt", "collection": "Session" } }, "userId": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "userId", "collection": "Session", "primaryKey": false, "optional": false, "references": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "User", "primaryKey": true } } } } }, "deprecated": false, "indexes": {} }, false);
const Course = asDrizzleTable("Course", { "columns": { "id": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "Course", "primaryKey": true } }, "title": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "title", "collection": "Course", "primaryKey": false, "optional": false } }, "level": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "level", "collection": "Course", "primaryKey": false, "optional": false } }, "concepts": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "concepts", "collection": "Course", "primaryKey": false, "optional": false } }, "start": { "type": "date", "schema": { "optional": false, "unique": false, "deprecated": false, "name": "start", "collection": "Course" } }, "end": { "type": "date", "schema": { "optional": false, "unique": false, "deprecated": false, "name": "end", "collection": "Course" } }, "schedules": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "schedules", "collection": "Course", "default": "0 0-2 * * 1-5", "primaryKey": false, "optional": true } }, "userId": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "userId", "collection": "Course", "primaryKey": false, "optional": false, "references": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "User", "primaryKey": true } } } } }, "deprecated": false, "indexes": {} }, false);
const Lesson = asDrizzleTable("Lesson", { "columns": { "id": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "Lesson", "primaryKey": true } }, "title": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "title", "collection": "Lesson", "primaryKey": false, "optional": false } }, "caption": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "caption", "collection": "Lesson", "primaryKey": false, "optional": false } }, "start": { "type": "date", "schema": { "optional": false, "unique": false, "deprecated": false, "name": "start", "collection": "Lesson" } }, "end": { "type": "date", "schema": { "optional": false, "unique": false, "deprecated": false, "name": "end", "collection": "Lesson" } }, "done": { "type": "boolean", "schema": { "optional": false, "unique": false, "deprecated": false, "name": "done", "collection": "Lesson", "default": false } }, "content": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "content", "collection": "Lesson", "primaryKey": false, "optional": true } }, "image": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "image", "collection": "Lesson", "primaryKey": false, "optional": true } }, "videoId": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "videoId", "collection": "Lesson", "primaryKey": false, "optional": true } }, "video": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "video", "collection": "Lesson", "primaryKey": false, "optional": true } }, "courseId": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "courseId", "collection": "Lesson", "primaryKey": false, "optional": false, "references": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "Course", "primaryKey": true } } } } }, "deprecated": false, "indexes": {} }, false);

export { Course as C, Lesson as L, Session as S, User as U, db as d };