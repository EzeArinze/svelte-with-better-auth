import { form, getRequestEvent, query } from '$app/server';
import { auth } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { post } from '$lib/server/db/schema';
import { error, redirect } from '@sveltejs/kit';
import * as v from 'valibot';

export const get_all_post = query(async () => db.query.post.findMany());

export const get_post_by_id = query(v.string(), async (id) =>
	db.query.post.findFirst({
		where: (field, { eq }) => eq(field.id, id)
	})
);

export const create_post = form(
	v.object({
		title: v.pipe(v.string(), v.nonEmpty('Title is required')),
		body: v.pipe(v.string(), v.nonEmpty('Body is required'))
	}),
	async ({ title, body }) => {
		const event = getRequestEvent();
		const session = await auth.api.getSession({
			headers: event.request.headers
		});

		if (!session?.user.id) {
			error(401, 'Unauthorized');
		}

		const slug = title.toLocaleLowerCase().replace(/ /g, '-');

		await db.insert(post).values({
			title,
			body,
			slug,
			authorId: session.user.id
		});

		redirect(303, '/admin');
	}
);
