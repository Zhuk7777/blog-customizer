import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';
import { useDisclosure } from 'src/hooks/useDisclosure';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

const ArrowButtonWithState = () => {
	const { isOpen, toggle } = useDisclosure();
	return <ArrowButton onClick={toggle} isOpen={isOpen} />;
};

export const ArrowButtonStory: Story = {
	render: () => {
		return (
			<>
				<ArrowButtonWithState />
			</>
		);
	},
};
