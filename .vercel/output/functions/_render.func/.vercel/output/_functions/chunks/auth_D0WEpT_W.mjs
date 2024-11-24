import { Lucia, TimeSpan } from 'lucia';
import { d as db, S as Session, U as User } from './_astro_db_DqqSvL7D.mjs';
import { eq, lte } from '@astrojs/db/dist/runtime/virtual.js';

/// <reference types="@astrojs/db" />
class AstroDBAdapter {
    db;
    sessionTable;
    userTable;
    constructor(db, sessionTable, userTable) {
        this.db = db;
        this.sessionTable = sessionTable;
        this.userTable = userTable;
    }
    async deleteSession(sessionId) {
        await this.db.delete(this.sessionTable).where(eq(this.sessionTable.id, sessionId));
    }
    async deleteUserSessions(userId) {
        await this.db.delete(this.sessionTable).where(eq(this.sessionTable.userId, userId));
    }
    async getSessionAndUser(sessionId) {
        const result = await this.db
            .select({
            user: this.userTable,
            session: this.sessionTable
        })
            .from(this.sessionTable)
            .innerJoin(this.userTable, eq(this.sessionTable.userId, this.userTable.id))
            .where(eq(this.sessionTable.id, sessionId))
            .get();
        if (!result)
            return [null, null];
        return [transformIntoDatabaseSession(result.session), transformIntoDatabaseUser(result.user)];
    }
    async getUserSessions(userId) {
        const result = await this.db
            .select()
            .from(this.sessionTable)
            .where(eq(this.sessionTable.userId, userId))
            .all();
        return result.map((val) => {
            return transformIntoDatabaseSession(val);
        });
    }
    async setSession(session) {
        await this.db
            .insert(this.sessionTable)
            .values({
            id: session.id,
            userId: session.userId,
            expiresAt: session.expiresAt,
            ...session.attributes
        })
            .run();
    }
    async updateSessionExpiration(sessionId, expiresAt) {
        await this.db
            .update(this.sessionTable)
            .set({
            expiresAt: expiresAt
        })
            .where(eq(this.sessionTable.id, sessionId))
            .run();
    }
    async deleteExpiredSessions() {
        await this.db.delete(this.sessionTable).where(lte(this.sessionTable.expiresAt, new Date()));
    }
}
function transformIntoDatabaseSession(raw) {
    const { id, userId, expiresAt, ...attributes } = raw;
    return {
        userId,
        id,
        expiresAt,
        attributes
    };
}
function transformIntoDatabaseUser(raw) {
    const { id, ...attributes } = raw;
    return {
        id,
        attributes
    };
}

const lucia = new Lucia(
  new AstroDBAdapter(db, Session, User),
  {
    sessionExpiresIn: new TimeSpan(7, "w"),
    sessionCookie: {
      attributes: {
        sameSite: "none",
        secure: true
      }
    },
    getUserAttributes: (attributes) => {
      return {
        photoUrl: attributes.photoUrl,
        names: attributes.names,
        email: attributes.email
      };
    }
  }
);

export { lucia as l };
