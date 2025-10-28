import React from 'react';
import { Text, Group, Button } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

export default function Comment({ comment, edit = false, handleDelete }) {
	return (
		<Group justify={'space-between'}>
			<Text key={comment.id} component="div">
				<Group gap="xl">
					<Text fw={700}>{comment.author.username}</Text>
					<Text size="md" color="gray">
						{new Date(comment.createdAt).toLocaleString()}
					</Text>
				</Group>
				<Text size="lg">{comment.content}</Text>
			</Text>
			{edit ? (
				<Button variant="subtle" onClick={() => handleDelete(comment.id)}>
					<IconTrash size={20} />
				</Button>
			) : (
				''
			)}
		</Group>
	);
}
