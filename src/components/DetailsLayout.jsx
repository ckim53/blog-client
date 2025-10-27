import { Outlet, Link } from 'react-router-dom';
import { Button, Box } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';

export default function DetailsLayout() {
	return (
		<Box className="details-layout" pos="relative" mih="100vh" p="xl" pb="xl">
			<Button
				size="md"
				m="lg"
				radius="md"
				leftSection={<IconArrowLeft size={15} />}
				component={Link}
				to={`/`}
				styles={{
					root: {
						backgroundColor: 'steelblue',
						width: 'fit-content',
					},
				}}
			>
				Back to Home
			</Button>
			<Box pt="lg" pb="xl" px="15rem">
				<Outlet />
			</Box>
		</Box>
	);
}
